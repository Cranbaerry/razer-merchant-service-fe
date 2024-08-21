<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import axios from 'axios'
import Button from "primevue/button";
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import SelectButton from 'primevue/selectbutton';
import FloatLabel from 'primevue/floatlabel';

const orderDetails = ref({
  billingFirstName: 'Razer',
  billingLastName: 'Demo',
  billingMobile: '55218438',
  billingEmail: 'demo@razer.com',
  billingAddress: 'J-39-1, Block J, Jalan Multimedia, I-City',
  billingCity: 'Selangor',
  billingState: 'Shah Alam',
  billingPostcode: '40000',
  payment_options: 'credit',
  currency: 'MYR',
  total_amount: 1.01,
  mpsmerchantid: '',
  mpschannel: '',
  mpsamount: '',
  mpsorderid: '',
  mpsbill_name: '',
  mpsbill_email: '',
  mpsbill_mobile: '',
  mpsbill_desc: '',
  mpsvcode: '',
  mpscurrency: '',
  mpslangcode: 'en',
  mpstimerbox: '#counter',
  mpscallbackurl: '',
  mpsreturnurl: '',
  mpsnotifyurl: '',
})

const isLoading = ref(false); // Track loading state

const fetchOrderDetails = async () => {
  isLoading.value = true; // Start loading
  try {
    const response = await axios.post('http://localhost:3000/payment/process-order', {
      billingFirstName: orderDetails.value.billingFirstName,
      billingLastName: orderDetails.value.billingLastName,
      billingMobile: orderDetails.value.billingMobile,
      billingEmail: orderDetails.value.billingEmail,
      billingAddress: orderDetails.value.billingAddress,
      billingCity: orderDetails.value.billingCity,
      billingState: orderDetails.value.billingState,
      billingPostcode: orderDetails.value.billingPostcode,
      chk_deliver_same_addr: 'on',
      chk_tnc: 'on',
      payment_options: orderDetails.value.payment_options,
      currency: orderDetails.value.currency,
      total_amount: orderDetails.value.total_amount,
    })

    if (response.data.status === 'success') {
      const order = response.data.data.order
      orderDetails.value.mpsmerchantid = order.mpsmerchantid
      orderDetails.value.mpschannel = order.mpschannel
      orderDetails.value.mpsamount = order.mpsamount
      orderDetails.value.mpsorderid = order.mpsorderid
      orderDetails.value.mpsbill_name = order.mpsbill_name
      orderDetails.value.mpsbill_email = order.mpsbill_email
      orderDetails.value.mpsbill_mobile = order.mpsbill_mobile
      orderDetails.value.mpsbill_desc = order.mpsbill_desc
      orderDetails.value.mpsvcode = order.mpsvcode
      orderDetails.value.mpscurrency = order.mpscurrency
      orderDetails.value.mpscallbackurl = order.mpscallbackurl
      orderDetails.value.mpsreturnurl = order.mpsreturnurl
      orderDetails.value.mpsnotifyurl = order.mpsnotifyurl

      // Auto-click the button
      await nextTick(); // Ensure DOM is updated
      const visaButton:HTMLButtonElement | null = document.querySelector('[data-toggle="molpayseamless"]');
      if (visaButton) {
        visaButton.click();
      }
    }
  } catch (error) {
    console.error('Error fetching order details:', error)
  } finally {
    isLoading.value = false; // Stop loading
  }
}

onMounted(() => {
  const scripts = [
    "https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js",
    "https://sandbox.merchant.razer.com/RMS/API/seamless/latest/js/MOLPay_seamless.deco.js"
  ];
  scripts.forEach(script => {
    let tag = document.head.querySelector(`[src="${script}"]`);
    if (!tag) {
      tag = document.createElement("script");
      tag.setAttribute("src", script);
      tag.setAttribute("type", 'text/javascript');
      document.head.appendChild(tag);
    }
  });
})
</script>

<template>
  <div class="about">
    <form @submit.prevent="fetchOrderDetails">
      <div style="  display: flex;">
        <div style="margin-right: 10px !important;">
          <div class="label1">
            <FloatLabel>
              <label for="billingFirstName">First Name:</label>
              <InputText id="billingFirstName" v-model="orderDetails.billingFirstName" required />
            </FloatLabel>
          </div>
          <div class="label1">
            <FloatLabel>
              <label for="billingLastName">Last Name:</label>
              <InputText id="billingLastName" v-model="orderDetails.billingLastName" required />
            </FloatLabel>
          </div>
          <div class="label1">
            <FloatLabel>
              <label for="billingMobile">Mobile:</label>
              <InputText id="billingMobile" v-model="orderDetails.billingMobile" required />
            </FloatLabel>
          </div>
          <div class="label1">
            <FloatLabel>
              <label for="billingEmail">Email:</label>
              <InputText id="billingEmail" v-model="orderDetails.billingEmail" type="email" required />
            </FloatLabel>
          </div>
          <div class="label1">
            <FloatLabel>
              <label for="billingAddress">Address:</label>
              <InputText id="billingAddress" v-model="orderDetails.billingAddress" rows="3" required />
            </FloatLabel>
          </div>
        </div>
        <div>
          <div class="label1">
            <FloatLabel>
              <label for="billingCity">City:</label>
              <InputText id="billingCity" v-model="orderDetails.billingCity" required />
            </FloatLabel>
          </div>
          <div class="label1">
            <FloatLabel>
              <label for="billingState">State:</label>
              <InputText id="billingState" v-model="orderDetails.billingState" required />
            </FloatLabel>
          </div>
          <div class="label1">
            <FloatLabel>
              <label for="billingPostcode">Postcode:</label>
              <InputText id="billingPostcode" v-model="orderDetails.billingPostcode" required />
            </FloatLabel>
          </div>
          <div class="label3">
            <FloatLabel>
              <label for="totalAmount">Total Amount:</label>
              <InputNumber id="totalAmount" v-model="orderDetails.total_amount" mode="currency" currency="MYR" disabled />
            </FloatLabel>
          </div>
          <div class="label2">
            <label for="paymentOptions">Payment Options:</label>
            <SelectButton id="paymentOptions" v-model="orderDetails.payment_options" :options="['credit', 'maybank2u']" />
          </div>

        </div>

      </div>
      <div style="width: 100%;">
        <Button type="submit" label="Checkout" class="p-mt-3" style="float: right; margin-top:-10px;" />
      </div>
    </form>

    <div v-if="orderDetails.mpsorderid" style="display: none;">Payment Channel:
      <Button label="Pay with VISA" data-toggle="molpayseamless" :data-mpsmerchantid="orderDetails.mpsmerchantid"
        :data-mpschannel="orderDetails.mpschannel" :data-mpsamount="orderDetails.mpsamount"
        :data-mpsorderid="orderDetails.mpsorderid" :data-mpsbill_name="orderDetails.mpsbill_name"
        :data-mpsbill_email="orderDetails.mpsbill_email" :data-mpsbill_mobile="orderDetails.mpsbill_mobile"
        :data-mpsbill_desc="orderDetails.mpsbill_desc" :data-mpsvcode="orderDetails.mpsvcode"
        :data-mpscurrency="orderDetails.mpscurrency" :data-mpscallbackurl="orderDetails.mpscallbackurl"
        :data-mpsreturnurl="orderDetails.mpsreturnurl" :data-mpsnotifyurl="orderDetails.mpscallbackurl"
        class="p-mt-3" />
    </div>
  </div>
</template>
<style>
.p-button-loading {
  background-color: gray !important;
  cursor: not-allowed;
  pointer-events: none;
}

.p-togglebutton {
  width: 100%;
}s

.p-button-secondary {
  background-color: gray !important;
  border-color: gray !important;
}

.label1,
.label3,
.label2 {
  padding-bottom: 30px;
}

.label2 {
  display: grid;
  margin-top: -20px;
}

.about {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.p-fluid {
  width: 100%;
  max-width: 600px;
}

.p-field {
  margin-bottom: 1rem;
}

.p-mt-3 {
  margin-top: 1rem;
}
</style>

<template>
  <teleport to="head">
    <component :is="'script'" src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js" async />
    <component :is="'script'"
      src="https://pay.merchant.razer.com/RMS/API/seamless/3.28/js/MOLPay_seamless.deco.js" async />
  </teleport>

  <div class="about">
    <!-- Button trigger Razer Merchant Services Seamless -->
    <Button label="Trigger Razer Merchant Service Seamless" data-toggle="molpayseamless"
      data-mpsmerchantid="SB_dreamztech" data-mpschannel="maybank2u" data-mpsamount="1.20"
      data-mpsorderid="TEST1139669863" data-mpsbill_name="MOLPay Technical" />

      <!-- Button trigger Razer Merchant Services Seamless -->
<button type="button" id="myPay" class="btn btn-primary btn-lg" data-toggle="molpayseamless" data-mpsmerchantid="SB_dreamztech" data-mpschannel="maybank2u" data-mpsamount="1.20" data-mpsorderid="TEST1139669863" data-mpsbill_name="MOLPay Technical" >Pay by Maybank2u</button>
  </div>

</template>
<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>

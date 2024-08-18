<script>
export default {
  mounted() {
    const scripts = [
      "https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js",
      "https://sandbox.merchant.razer.com/RMS/API/seamless/latest/js/MOLPay_seamless.deco.js"
    ];
    scripts.forEach(script => {
      let tag = document.head.querySelector(`[src="${script}"`);
      if (!tag) {
        tag = document.createElement("script");
        tag.setAttribute("src", script);
        tag.setAttribute("type", 'text/javascript');
        document.head.appendChild(tag);
      }
    });
  },
}
</script>

<template>
  <!-- <teleport to="head">
    <component :is="'script'" src="" async />
    <component :is="'script'"
      src="" async />
  </teleport> -->

  <div class="about">
    <!-- Button trigger Razer Merchant Services Seamless -->
    <Button label="Trigger Razer Merchant Service Seamless" data-toggle="molpayseamless"
      data-mpsmerchantid="SB_dreamztech" data-mpschannel="maybank2u" data-mpsamount="1.20"
      data-mpsorderid="TEST1139669863" data-mpsbill_name="MOLPay Technical" />
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

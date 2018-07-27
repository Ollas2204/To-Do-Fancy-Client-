<template>
<div class="body">
  <Navbar/>
  <Timeline/>
  <Footer/>
</div>
</template>



<script>
import Navbar from '@/components/Navbar.vue'
import Timeline from '@/components/Timeline.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'Welcome',
  components:{
    Navbar,
    Timeline,
    Footer
  }
}
</script>

<style scoped>

#wellcome {
  text-align: center;
}

#room {
  display: block;
  background-color: lightgrey;
  min-height: 100%;
  padding-bottom: 180px;
}

.footerFixed {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>

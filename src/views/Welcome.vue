<template>
<div class="body">
  <Navbar/>
  <ListContent/>
  <Footer/>
</div>
</template>



<script>
import Navbar from '@/components/Navbar.vue'
import ListContent from '@/components/ListContent.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'Welcome',
  components:{
    Navbar,
    ListContent,
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

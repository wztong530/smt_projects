<template>
  <footer>
  	<div class="pc">
	  	<div class="footer">
	  		<p class="company">论数科技（厦门）有限公司</p>
			<p class="number">客服热线：0592-6666777</p>
			<p class="copyRight">Copyright © 2012-2019 Renrencha.All Rights Reserved 闽ICP备16018304号-1</p>
	  	</div>
  	</div>
  	
  </footer>
</template>

<script>
export default {
  name: 'Footer',
  data () {
    return {

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.footer{
		display: flex;
		flex-direction: column;
		align-items: center;
		height: 22.87vh;
		background: #161519;
		color: rgba(255,255,255,0.45);
		box-sizing: border-box;
	}
	.footer .company{
		padding-top: 5.3vh;
		font-family: PingFangSC-Thin;
		font-size: 1.4vh;
		color: #FFFFFF;
		letter-spacing: 0;
		text-align: center;
		line-height: 4.1vh;
	}
	.footer .number{
		font-family: PingFangSC-Semibold;
		font-size: 2.3vh;
		color: #FFFFFF;
		letter-spacing: 0;
		text-align: center;
		line-height: 4.1vh;
		margin-bottom: 35px;
	}
	.footer .copyRight{
		font-family: PingFangSC-Thin;
		font-size: 1vh;
		color: rgba(255,255,255,0.47);
		letter-spacing: 0;
	}

</style>

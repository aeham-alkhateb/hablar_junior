
	<template>
		<div class="modal fade" id="viewModal" tabindex="-1" role="dialog" aria-labelledby="viewModalLabel" aria-hidden="true">
	  <div class="modal-dialog" role="document">
	    <div class="modal-content">  
	           
			   <iframe id="fr" 
			   width="100%"
			   height="600px"
			   frameborder="0" >
			  </iframe>
	    </div>
	  </div>
	</div>
	</template>
	<!-- Modal -->
	


 
new Vue({
	el: '#root',
	methods: {
		showModal: function() { 
			$('#mdl').modal('show'); 
		},
		closeModal: function() {
			$('#mdl').modal('hide');
		}

	}
})

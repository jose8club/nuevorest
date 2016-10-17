var basePath = "http://146.83.216.162:8080/";
var usuarios;
var currentid;
//cuando el documentos ya este cargado
//$ = JQuery
//get: obtener recurso
//put: actualiza recurso
//post: enviar un recurso
//delete: eliminar un recurso
$(document).ready(function(){
	$.ajax({
		url: basePath + "users/",
		type: "GET",
		dataType: "JSON",
		success: function(data){
			var users=data.data; //estructura del data a la que se puede ingresar
			usuarios = users;
			console.log(users);
			var php = '<div class="row">';
			//en materialize las columnas son s: pantalla chica, m: pantalla mediana y l: pantalla larga
			//y el numero de columnas es el total= 12 dividido por el numero que es 4 por lo q habra 3 elementos por fila
			for(var i=0;i<users.length;i++){
				php=php + '<div id="'+users[i]._id+'" class="col s4 m4 l4">'+
							'<div class="card" id="elem">'+			
    							'<div class="card-image waves-effect waves-block waves-light">'+
     								'<img class="activator" src="'+users[i].img+'"></img>'+
    							'</div>'+
    							'<div class="card-content">'+
      								'<span class="card-title activator grey-text text-darken-4"><h4><b><em>'+users[i].first_name+' '+users[i].last_name+'</em></b></h4><i class="material-icons right">Desplegar Comentario</i></span>'+
      								'<p><a id="btnn" class="waves-effect waves-light btn modal-trigger" onclick="mostrar_modal('+i+')">Editar Datos</a></p>'+
    							'</div>'+
    							'<div class="card-reveal name">'+
      								'<span class="card-title grey-text text-darken-4"><h4><b><em>'+users[i].first_name+' '+users[i].last_name+'</em></b></h4><i class="material-icons right">Contraer Comentario</i></span>'+
      								'<p><em>'+users[i].comment+'</em></p>'+
    							'</div>'+
  							'</div>'+
  						'</div>';
			}
			php = php +'</div>';
			$("body").append(php);

		},
		error: function() {
			
		}

	});
	
});

function mostrar_modal(id){
	currentid = id;
	$('#ids').val(usuarios[currentid]._id);
	$('#nombre').val(usuarios[currentid].first_name);
	$('#apellido').val(usuarios[currentid].last_name);
	$('#comentario').val(usuarios[currentid].comment);
	$('#imagen').val(usuarios[currentid].img);
	$('#modal1').openModal();

}

function crear_modal(){
	$('#modal2').openModal();
}

function crear(){
	$.ajax({
		url: basePath + "users/",
		type: "POST",
		dataType: "JSON",
		data:{
			first_name:$('#nombrenuevo').val(),
			last_name:$('#apellidonuevo').val(),
			comment:$('#comentarionuevo').val(),
			img:$('#imagennueva').val()
		},
		success: function(data){
			alert("Usuario Creado: " + data.data._id);
			location.reload();
		},
		error: function(){
			
		}
	});
}

function modificar(){
	$.ajax({
		url: basePath + "users/" + usuarios[currentid]._id,
		type: "PUT",
		dataType: "JSON",
		data:{
			first_name:$('#nombre').val(),
			last_name:$('#apellido').val(),
			comment:$('#comentario').val(),
			img:$('#imagen').val()
		},
		success: function(data){
			alert("Usuario Modificado");
			location.reload();
		},
		error: function(){

		}
	});
}

function eliminado(){
	$.ajax({
		url: basePath + "users/" + usuarios[currentid]._id,
		type: "DELETE",
		dataType: "JSON",
		data:{
			_id:$('#id').val()
		},
		success: function(data){
			alert("Usuario Eliminado");
			location.reload();
		},
		error: function(){

		}
	});
}

function ver_autor(){
	alert("Creado por: \n José Luis Acuña Oyarce");
}
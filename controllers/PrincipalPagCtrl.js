
var vmSitioWebController=null;

var app = angular.module("app").controller("PrincipalPagController", function($scope, $http, $log){
    var vm = this;
    vmSitioWebController = vm;



    vm.arbolIzquierdoArt= new ArbolBinario();
    vm.arbolDerechoArt= new ArbolBinario();

    vm.arbolIzquierdoEnc= new ArbolBinarioEncuesta();
    vm.arbolDerechoEnc= new ArbolBinarioEncuesta();
    vm.Cargando = true;
    vm.GrifoMinimo = null;

    vm.Marcas=false;
    vm.Usuarios=true;
    vm.Encuesta=true;
    vm.Ventas=true;
    vm.Grafica=true;
    vm.Grifo=true;
    vm.Cantidad=1;
    vm.CMostrar=0;
    vm.Ordenar="ID";
    vm.Buscar=0;

    vm.objInfo = {
        ID: 0,
        Nombre: '',
        Cost: 0,
        Venta: 0
    }
    vm.objEnc = {
        ID: 0,
        Grado: 0,
        Fecha: 0
    }
    vm.objCli = {
        ID: 0,
        Nombre: ''
    }
    vm.objVenta = {
        ID: 0,
        IDCliente: 0,
        IDArtirculo: 0,
        Cost: 0,
        Venta: 0 
    }
    vm.Tiempo={
        ID: 0,
        IDCliente: 0,
        Cost: 0,
        Venta: 0,
        Grado: 0, 
    }
    vm.GrifoShow = function(){
            vm.Marcas=true;
            vm.Usuarios=true;
            vm.Encuesta=true;
            vm.Ventas=true;
            vm.Grafica=true;
            vm.Grifo=false;
            if(vm.GrifoMinimo==null){
                vm.LLenarrbolKruskal();
            }
    }

    vm.OrdenarCotroler=function(como,donde){
        vm.Ordenar=como;
        vm.Cantidad=1;
        if(donde=='Venta'){
            vm.LoadDataVenta();
        }else if(donde=='Encuesta'){
            vm.LoadDataEncuesta();
        }
    }
    vm.MarcasHide=function(){
        vm.Marcas=false;
        vm.Usuarios=true;
        vm.Encuesta=true;
        vm.Ventas=true;
        vm.Grafica=true;
        vm.Grifo=true;
        vm.Cantidad=1;
        vm.LoadData();
        vm.Ordenar="ID";
 
    }
    vm.UsuariosHide=function(){
        vm. Marcas=true;
        vm.Usuarios=false;
        vm.Encuesta=true;
        vm.Ventas=true;
        vm.Grafica=true;
        vm.Grifo=true;
        vm.Cantidad=1;
        vm.LoadDataUsuario();
        vm.Ordenar="ID";
    }
    vm.EncuestaHide=function(){
        vm.Marcas=true;
        vm.Usuarios=true;
        vm.Encuesta=false;
        vm.Ventas=true;
        vm.Grafica=true;
        vm.Grifo=true;
        vm.Cantidad=1;
        vm.LoadDataEncuesta();
        vm.Ordenar="ID";
 
    }
    vm.VentaHide=function(){
        vm.Marcas=true;
        vm.Usuarios=true;
        vm.Encuesta=true;
        vm.Ventas=false;
        vm.Grafica=true;
        vm.Grifo=true;
        vm.Cantidad=1;
        vm.LoadDataVenta();
        vm.Ordenar="ID";
 
    }

    vm.GragicaHide=function(){
        vm.Marcas=true;
        vm.Usuarios=true;
        vm.Encuesta=true;
        vm.Ventas=true;
        vm.Grafica=false;
        vm.Grifo=true;
        vm.Cantidad=1;
        vm.Ordenar="ID";
 
    }

    vm.LoadData=function(){
        $http({
            method:'GET',
            url:'php/GetData.php',

        }).then(function (response){
            vm.CantidadData=vm.Cantidad*10;
            vm.CMostrar=response.data.length/10;
            if(vm.CantidadData>response.data.length){
                vm.PageInicio=response.data.slice(response.data.length-10,response.data.length);
            }else{
                vm.PageInicio=response.data.slice(vm.CantidadData-10,vm.CantidadData);
            }
        })
    }

    vm.LoadDataUsuario=function(){
        $http({
            method:'GET',
            url:'php/GetDataUsuario.php',

        }).then(function (response){
            vm.CantidadData=vm.Cantidad*10;
            vm.CMostrar=response.data.length/10;
            if(vm.CantidadData>response.data.length){
                vm.ArrayClientes=response.data.slice(response.data.length-10,response.data.length);
            }else{
                vm.ArrayClientes=response.data.slice(vm.CantidadData-10,vm.CantidadData);
            } 
        })
    }

    vm.LoadDataEncuesta=function(){
        var startMsec = new Date;
        if(vm.Ordenar=='Grado'){
            $http({
                method:'GET',
                url:'php/GetQuickGrado.php',
                params: {
                    Ordenar: vm.Ordenar
                }
            
            }).then(function (response){
                vm.CantidadData=vm.Cantidad*10;
                vm.CMostrar=response.data.length/10;
                if(vm.CantidadData>response.data.length){
                    vm.ArrayEncuesta=response.data.slice(response.data.length-10,response.data.length);
                }else{
                    vm.ArrayEncuesta=response.data.slice(vm.CantidadData-10,vm.CantidadData);
                } 
            var endMsec = new Date
            vm.Tiempo.Grado=endMsec-startMsec;
    
            vm.Grficadora();
            })

        }else{
        $http({
            method:'GET',
            url:'php/GetEncuesta.php',

        }).then(function (response){
            vm.CantidadData=vm.Cantidad*10;
            vm.CMostrar=response.data.length/10;
            if(vm.CantidadData>response.data.length){
                vm.ArrayEncuesta=response.data.slice(response.data.length-10,response.data.length);
            }else{
                vm.ArrayEncuesta=response.data.slice(vm.CantidadData-10,vm.CantidadData);
            } 
          
            })
        }
    }
    vm.LoadDataVenta=function(){
        var startMsec = new Date;
        if(vm.Ordenar=='Cost'){
            $http({
                method:'GET',
                url:'php/GetQuickCost.php',
                params: {
                    Ordenar: vm.Ordenar
                }
            
            }).then(function (response){
                vm.CantidadData=vm.Cantidad*10;
                console.log(response.data.length);
                vm.CMostrar=response.data.length/10;
                if(vm.CantidadData>response.data.length){
                    vm.ArrayVenta=response.data.slice(response.data.length-10,response.data.length);
                }else{
                    vm.ArrayVenta=response.data.slice(vm.CantidadData-10,vm.CantidadData);
                } 
                var endMsec = new Date
                vm.Tiempo.Cost=endMsec-startMsec;
            
                vm.Grficadora();
            })

        }else if(vm.Ordenar=='Venta'){
            $http({
                method:'GET',
                url:'php/GetQuickCost.php',
                params: {
                    Ordenar: vm.Ordenar
                }
            
            }).then(function (response){
                vm.CantidadData=vm.Cantidad*10;
                console.log(response.data.length);
                vm.CMostrar=response.data.length/10;
                if(vm.CantidadData>response.data.length){
                    vm.ArrayVenta=response.data.slice(response.data.length-10,response.data.length);
                }else{
                    vm.ArrayVenta=response.data.slice(vm.CantidadData-10,vm.CantidadData);
                } 
                var endMsec = new Date
                vm.Tiempo.Venta=endMsec-startMsec;
       
                vm.Grficadora();
            })
        }else if(vm.Ordenar=='IDCliente'){
            $http({
                method:'GET',
                url:'php/GetQuickCost.php',
                params: {
                    Ordenar: vm.Ordenar
                }
            
            }).then(function (response){
                vm.CantidadData=vm.Cantidad*10;
                console.log(response.data.length);
                vm.CMostrar=response.data.length/10;
                if(vm.CantidadData>response.data.length){
                    vm.ArrayVenta=response.data.slice(response.data.length-10,response.data.length);
                }else{
                    vm.ArrayVenta=response.data.slice(vm.CantidadData-10,vm.CantidadData);
                } 
                var endMsec = new Date
                vm.Tiempo.IDCliente=endMsec-startMsec;
              
                vm.Grficadora();
            })

        }else{
            $http({
                method:'GET',
                url:'php/GetVenta.php',
            
            }).then(function (response){
                vm.CantidadData=vm.Cantidad*10;
                console.log(response.data.length);
                vm.CMostrar=response.data.length/10;
                if(vm.CantidadData>response.data.length){
                    vm.ArrayVenta=response.data.slice(response.data.length-10,response.data.length);
                }else{
                    vm.ArrayVenta=response.data.slice(vm.CantidadData-10,vm.CantidadData);
                } 
                var endMsec = new Date
                vm.Tiempo.ID=endMsec-startMsec;
         
                vm.Grficadora();
            })
        }
    
    }


    vm.RandomIndo=function(){
                $http({
                    method:'GET',
                    url:'php/SaveDataRandom.php',
                    params: {
                        NameFile: "Informacion.json"
                    }
            
                }).then(function (response){
                    vm.LoadData();
                })
        }

        vm.RandomIndoEncuesta=function(i){
                    $http({
                        method:'GET',
                        url:'php/SaveDataRandom.php',
                        params: {
                        NameFile: "Encuesta.json"
                        }
                
                    }).then(function (response){
                        vm.LoadDataEncuesta();
                    })
                
            }

            vm.RandomVenta=function(){
                    $http({
                        method:'GET',
                        url:'php/SaveDataRandom.php',
                        params: {
                            NameFile: "Venta.json"
                        }
                    
                    }).then(function (response){
                        vm.LoadDataVenta(); 
                    })
            } 
                

        vm.guardar=function(Datos,filename){
                $http({
                    method:'GET',
                    url:'php/SaveDataModific.php',
                    params: {
                        Informacion:JSON.stringify(Datos),
                        NameFile: filename
                    }
            
                }).then(function (response){

                })
        }

        vm.SaveDataNew=function(filename){
   
            if(filename=="Informacion.json"){
             
                $http({
                    method:'GET',
                    url:'php/SaveDataNew.php',
                    params: {
                        Informacion:JSON.stringify(vm.objInfo),
                        NameFile: filename
                    }
            
                }).then(function (response){
    
                })
            }else if(filename=="Encuesta.json"){
           
                $http({
                    method:'GET',
                    url:'php/SaveDataNew.php',
                    params: {
                        Informacion:JSON.stringify(vm.objEnc),
                        NameFile: filename
                    }
            
                }).then(function (response){
    
                })
            }else if(filename=="Venta.json"){
           
                $http({
                    method:'GET',
                    url:'php/SaveDataNew.php',
                    params: {
                        Informacion:JSON.stringify(vm.objVenta),
                        NameFile: filename
                    }
            
                }).then(function (response){
    
                })
            }else if(filename=="Clientes.json"){
             
                $http({
                    method:'GET',
                    url:'php/SaveDataNew.php',
                    params: {
                        Informacion:JSON.stringify(vm.objCli),
                        NameFile: filename
                    }
            
                }).then(function (response){
    
                })
            }



        }

            vm.RandomUsuarios=function(){
                $http({
                    method:'GET',
                    url:'php/SaveDataRandom.php',
                    params: {
                        NameFile: "Clientes.json"
                    }
            
                }).then(function (response){
                    vm.LoadDataUsuario();
                })

        }
     
        
        
        vm.Grficadora=function(){
            var ctx = document.getElementById('myChart').getContext('2d');
            var chart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['Costo', 'Venta', 'IDCliente', 'ID', 'Grado'],
                    datasets: [{
                        label: 'Tiempo',
                        backgroundColor: '#42a5f5',
                        borderColor: 'gray',
                        data: [vm.Tiempo.Cost, vm.Tiempo.Venta, vm.Tiempo.IDCliente, vm.Tiempo.ID, vm.Tiempo.Grado,0]
                    }	
                ]},
                options: {responsive: true}
            });
        }
        vm.LLenarrbolArticulo=function(){
            $http({
                method:'GET',
                url:'php/GetQuickCost.php',
                params: {
                    Ordenar: 'Venta'
                }
            
            }).then(function (response){
                vm.CargaMaxima = response.data.length;
                console.log("Entre");
                for(var i =0;i<Math.ceil(response.data.length/2);i++){
                    vm.arbolIzquierdoArt.add(response.data[i]);

                }
                for(var i =Math.ceil(response.data.length/2);i<response.data.length;i++){
              
                    vm.arbolDerechoArt.add(response.data[i]);

                }
                vm.Cargando= false;
                console.log("Termine de hacer y cargar el arbol");
            })
        }
        vm.Buscararrbol=function(){
            vm.ArrayVenta=[];
            console.log(vm.ArrayVenta);
            vm.ArrayVenta= vm.arbolIzquierdoArt.search(vm.Buscar);
            console.log(vm.ArrayVenta);
            if(vm.arbolDerechoArt.search(vm.Buscar)!=false){
                if(vm.ArrayVenta==false ){
                    vm.ArrayVenta=vm.arbolDerechoArt.search(vm.Buscar);
                }else{

                    vm.ArrayVenta=vm.ArrayVenta.concat(vm.arbolDerechoArt.search(vm.Buscar));
                }
                console.log(vm.ArrayVenta);
            }
        }

        vm.LLenarrbolEncuesta=function(){
            $http({
                method:'GET',
                url:'php/GetQuickGrado.php',
                params: {
                    Ordenar: 'Grado'
                }
            
            }).then(function (response){
                // Math.ceil(response.data.length/2
                for(var i=0 ;i<response.data.length;i++){
                   
                    vm.arbolIzquierdoEnc.add(response.data[i]);
               
                }
            })
        }

        vm.BuscararrbolEncuesta=function(){
            vm.ArrayEncuesta=[];
            vm.ArrayEncuesta= vm.arbolIzquierdoEnc.search(vm.Buscar);
        }

        vm.mostrarGrafo = function(){
            vm.CantidadData=vm.Cantidad*250;
            if(vm.CantidadData>vm.GrifoMinimo.length){
                 vm.mostrarGrafoTroso=vm.GrifoMinimo.slice(vm.GrifoMinimo.length-250,vm.GrifoMinimo.length);
            }else{
                 vm.mostrarGrafoTroso=vm.GrifoMinimo.slice(vm.CantidadData-250,vm.CantidadData);
            } 
        }

        vm.LLenarrbolKruskal=function(){
            $http({
                method:'GET',
                url:'php/GetVenta.php',
            
            }).then(function (response){
                function objPadreValue(ind,Object){
                    this.index = ind,
                    this.parent = Object;
            
               }
                function objPadreInicio(ind,ent){
                    this.index = ind,
                    this.parent = ent;
            
               }

               function objValort(ind,valu) {
                this.index= ind,
                this.value= valu;
               }

                var Total =[];
                var posicion=0;
                
                var objPadre = new objPadreInicio(response.data[posicion].ID,-1);
               Total[posicion]= objPadre;
               posicion++;
         

               for(var i = 0; i < 11 && posicion<response.data.length; i++){
                   vm.Buscar = i;
                   var EncuestaBuscar = vm.arbolIzquierdoEnc.search(vm.Buscar);
                   for(var h = 0; posicion<response.data.length && h < EncuestaBuscar.length ;h++){
                       var objValor = [];
                        objValor[0]= new objValort((response.data[posicion-1].ID).toString(),EncuestaBuscar[h].Grado.toString());
                        var rando = Math.floor(Math.random() * 5);
                        for(var e = 1; e <= rando; e++){
                            objValor[e]= new objValort((response.data[Math.floor(Math.random() * 4000)].ID).toString(), (Math.floor(Math.random() * 10)).toString());
                        } 
                         var objPadre = new objPadreValue(response.data[posicion].ID.toString(),objValor);
                        Total[posicion]=objPadre;
                     
                        posicion++;
                   }
               }
            //    var objValor = new objValort((response.data[posicion-1].ID).toString(),EncuestaBuscar[0].Grado.toString());
            //    var objPadre = new objPadreValue(response.data[0].ID.toString(),objValor);
            //    Total[0]=objPadre;
            //    var objValor = new objValort("1", "20");
            //    var objPadre = new objPadreValue(response.data[1].ID.toString(),objValor);
            //    Total[1]=objPadre;
            //    console.log(JSON.stringify(Total));
        
            vm.GrifoMinimo=vm.prim(Total);
            vm.CMostrar= vm.GrifoMinimo.length/250;
            vm.mostrarGrafo();
            })
        }
       
        vm.prim= function (nodes=[]){
            console.log("entre");
            let n = nodes.length;
            nodes=nodes.slice(1,n);
            let longitudesAristas = Array.from({length:n}, () =>
                Array.from({length:n}, () => Infinity));
            for (let node of nodes){
                if (Array.isArray(node.parent)){
                    for (let link of node.parent){
                        // console.log(link.value);
                        if (typeof link==="object" && link.value){
                            longitudesAristas[node.index][link.index] = link.value;
                            longitudesAristas[link.index][node.index] = link.value;
                        }
                    }
                }
            }
            console.log(longitudesAristas);
            let masProximo = [];
            let distanciaMinima = [];
            for (let i=0; i<n; i++){
                masProximo[i] = 0;
                distanciaMinima[i] = longitudesAristas[i][0];
            }
            let resultado = [];
            for (let i=1; i<n; i++){
                let minimo = Infinity;
                let k;
                for (let j=1; j<n; j++){
                    if (distanciaMinima[j]>=0 && distanciaMinima[j]<minimo){
                        minimo = distanciaMinima[j];
                        k = j;
                    }
                }
                resultado.push(`${k},${masProximo[k]}`);
                distanciaMinima[k] = -1;
                for (let j=1; j<n; j++){
                    if (longitudesAristas[j][k]<distanciaMinima[j]){
                        distanciaMinima[j] = longitudesAristas[j][k];
                        masProximo[j] = k;
                    }
                }
            }
            return resultado;
        }

        vm.LoadData();
        vm.LoadDataUsuario();
        vm.LoadDataEncuesta();
        vm.LoadDataVenta();
        vm.LLenarrbolArticulo();
         vm.LLenarrbolEncuesta();
        
});
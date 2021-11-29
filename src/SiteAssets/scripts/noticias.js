function getItems($scope, $sce, listName, query) {
   var data = [];

   var optionDate = { year: "numeric", month: "long", day: "numeric" };

   $.ajax({
      url: `/sites/CursoUdemy/_api/lists/getbytitle('${listName}')/items${query}`,
      method: "GET",
      headers: {
         "accept": "application/json;odata=verbose"
      },
      async: false,
      success: function (data) {
         $scope.items = data.d.results;
         console.log('Itens retornados da consulta', $scope.items)
         $scope.formatarData = function (dataPublicacao) {
            var data = new Date(dataPublicacao).toLocaleDateString("pt-BR", optionDate);
            return data;
         }

         $scope.items.forEach(function (item) {
            item.Descricao = $sce.trustAsHtml(item.Descricao);
         });

         $scope.TipoDeNoticiaSelector = function(tipoNoticia){
            $scope.items = data.d.results;

            if(tipoNoticia != "Todos"){
               var noticiasTipo = [];

               $scope.items.filter(function(item){
                  if(item.TipoNoticia == tipoNoticia){
                     noticiasTipo.push(item);
                  }

                  if(noticiasTipo.length > 0){
                     $scope.items = [];
                     $scope.items = noticiasTipo;
                  }
               });
            }
         }
      },
      error: function (sender, args) {
         console.log(args.get_message());
      }
   });
}
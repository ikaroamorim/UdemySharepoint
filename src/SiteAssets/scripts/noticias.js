function getItems($scope, $sce, listName, query) {
   let data = [];

   let optionDate = { year: "numeric", month: "long", day: "numeric" };

   let url = _spPageContextInfo.webAbsoluteUrl;
   console.log('url: ',url)

   //let urlSubsite = _spPageContextInfo.siteServerRelativeUrl;

   $.ajax({
      url: `${url}/_api/lists/getbytitle('${listName}')/items${query}`,
      method: "GET",
      headers: {
         "accept": "application/json;odata=verbose"
      },
      async: false,
      success: function (data) {
         $scope.items = data.d.results;
         console.log('Itens retornados da consulta', $scope.items)
         $scope.formatarData = function (dataPublicacao) {
            let data = new Date(dataPublicacao).toLocaleDateString("pt-BR", optionDate);
            return data;
         }

         $scope.items.forEach(function (item) {
            item.Descricao = $sce.trustAsHtml(item.Descricao);
         });

         $scope.TipoDeNoticiaSelector = function (tipoNoticia) {
            $scope.items = data.d.results;

            if (tipoNoticia != "Todos") {
               var noticiasTipo = [];

               $scope.items.filter(function (item) {
                  if (item.TipoNoticia == tipoNoticia) {
                     noticiasTipo.push(item);
                  }

                  if (noticiasTipo.length > 0) {
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

function addItem($scope, listName) {
   $scope.inserirLocalidade = function (textoLocalidade) {
      console.log(textoLocalidade)
      $.ajax({
         url: `/sites/CursoUdemy/_api/lists/getbytitle('${listName}')/items`,
         method: "POST",
         data: JSON.stringify({
            'Title': textoLocalidade,
            '__metadata': { 'type': 'SP.Data.' + listName + 'ListItem' },
         }),
         headers: {
            "accept": "application/json;odata=verbose",
            "content-type": "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val(),
         },
         success: function(data){
            console.log('sucesso',data)
         },
         error: function(err){
            console.error(err)
         }
      })
   }
}

function updateItem($scope, listName) {
   $scope.atualizarLocalidade = function (textoLocalidade, id) {
      console.log(textoLocalidade)
      $.ajax({
         url: `/sites/CursoUdemy/_api/lists/getbytitle('${listName}')/items('${id}')`,
         method: "POST",
         data: JSON.stringify({
            'Title': textoLocalidade,
            '__metadata': { 'type': 'SP.Data.' + listName + 'ListItem' },
         }),
         headers: {
            "accept": "application/json;odata=verbose",
            "content-type": "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val(),
            "X-HTTP-Method":"MERGE",
            "IF-MATCH": "*"
         },
         success: function(data){
            console.log('sucesso',data)
         },
         error: function(err){
            console.error(err)
         }
      })
   }
}

function deleteItem($scope, listName) {
   $scope.deletarLocalidade = function (id) {
      $.ajax({
         url: `/sites/CursoUdemy/_api/lists/getbytitle('${listName}')/items('${id}')`,
         method: "POST",
         data: JSON.stringify({
            '__metadata': { 'type': 'SP.Data.' + listName + 'ListItem' },
         }),
         headers: {
            "accept": "application/json;odata=verbose",
            "content-type": "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val(),
            "X-HTTP-Method":"DELETE",
            "IF-MATCH": "*"
         },
         success: function(data){
            console.log('sucesso',data)
         },
         error: function(err){
            console.error(err)
         }
      })
   }
}
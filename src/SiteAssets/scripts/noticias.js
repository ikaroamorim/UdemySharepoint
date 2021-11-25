function getItems($scope, listName, query) {
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
         $scope.formatarData = function (dataPublicacao) {
            var data = new Date(dataPublicacao).toLocaleDateString("pt-BR", optionDate);
            return data;
         }
      },
      error: function (sender, args) {
         console.log(args.get_message());
      }
   });
}
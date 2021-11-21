function getItems($scope, listName, query) {
   var data = [];

   $.ajax({
      url: `/sites/CursoUdemy/_api/lists/getbytitle('${listName}')/items${query}`,
      method: "GET",
      headers: { 
         "accept": "application/json;odata=verbose" 
      },
      async: false,
      success: function (data) {
         console.log(data);
         $scope.items = data.d.results;
      },
      error: function (sender, args) {
         console.log(args.get_message());
      }
   });
}
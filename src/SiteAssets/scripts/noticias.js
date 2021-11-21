function getItems(){
   var data = [];

   $.ajax({
      url:"/sites/CursoUdemy/_api/lists/getbytitle('Notícias')",
      method:"GET",
      headers:{"accept":"application/json;odata:verbose"},
      async:false,
      success: function(data){
         items = data.d.results
      },
      error: function(sender, args){
         console.log(args.get_message())
      }
   });
}
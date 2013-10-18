<script>
  
  var nodes = [];

  getSectionIndex("http://www.bbc.co.uk/things/4993e6b8-4214-44eb-9c66-67929058850f", "55e5w5gwnjyfg7z5rd7v8s93");

  function getSectionIndex(section, key) {
    $.ajax({
      url: "http://euanmorrison.co.uk/newshack/euan/interface.php?url=http://bbc.api.mashery.com/juicer-ld-api/storylines/graphs?uri=" + section + "&api_key=" + key,
     
      success: function( data ) {
      extractSectionIndexData(jQuery.parseJSON(data));
      }
    });
  }
  
  function extractSectionIndexData(data) {
    var graphs = data['@graph'];
    for(var i=0;i < graphs.length; i++)   
    {
      if (graphs[i]['@type'] === "Event")
      {
        var node =
        {
          title: graphs[i].preferredLabel,
          eventStartDate: graphs[i].eventStartDate
        };
        
        if (typeof graphs[i].taggedOn != 'undefined')
        {
          var newsitem = graphs[i].taggedOn;
          if (newsitem['@type'] === "NewsItem") {
            node.newsitem = newsitem['@id'],
            node.dateCreated = newsitem.dateCreated,
            node.description = newsitem.description;
          }
        }
        nodes.push(node);
      }
    }
  }

  </script>



$(document).ready(function () {
  //LOAD NAMESPACE MENU TAB 1
    //LOAD NAMESPACE MENU TAB 1
   


    $(function () {
        $("#namespaces").selectmenu();

    });

    $(function () {
      $("#tabsUL").tabs();
    });

    $('#namespaces').on('selectmenuselect', function () {
        var name = $('#namespaces').find(':selected').text();
        /////logger(name);
        UpdateNamespace(name);

    });




    $("#upload_button").button();
    $("input:radio[name='namespace']").change( function() {
        if ($(this).val() == "New") {
            $("#new_namespace_name").show();
        } else {
            $("#new_namespace_name").hide();
    
        }
    });
    
    $('form :input').on('change input', function() {
        console.log("changed!");
        var formData = new FormData(document.getElementById('upload_form'));
        let namespace = formData.get("namespace");
        if (namespace == "New") {
          existing_selections = allNamespaces.map(function(x) {return x.namespace});
          let new_name = formData.get("new_name");
            $("#submit_warnings").html("Please provide a new name!")
            $("#upload_button").attr("disabled", true).addClass("ui-state-disabled");
          if (new_name == "") {
          } else if (existing_selections.includes(new_name)) {
            $("#submit_warnings").html("This name is already taken!")
            $("#upload_button").attr("disabled", true).addClass("ui-state-disabled");
            return
          } else if (formData.get("layouts").size > 0)  {  // We need at least one layout to create a namespace
            $("#submit_warnings").html("")
            $("#upload_button").attr("disabled", false).removeClass("ui-state-disabled");
            return
          } else {
            $("#submit_warnings").html("Please add at least one layout to create a new namespace!")
            $("#upload_button").attr("disabled", true).addClass("ui-state-disabled");
          }
        } else {
          if (formData.get('layouts').size > 0 ||
              formData.get('links').size > 0 ||
              formData.get('labels').size > 0 ||
              formData.get('attributes').size > 0) {
            $("#submit_warnings").html("")
            $("#upload_button").attr("disabled", false).removeClass("ui-state-disabled");
            return
          }
        }
        $("#submit_warnings").html("Please add at least one object to upload!")
        $("#upload_button").attr("disabled", true).addClass("ui-state-disabled");
      });
      
      
      
      
      $("#upload_form").submit(function(event) {
        event.preventDefault();
      
        var form = $(this);
        var formData = new FormData(this);
        if (formData.get("namespace") == 'existing') {
          formData.append('existing_namespace', $('#namespaces').val());
        }
        let it = formData.keys();
        let result = it.next();
        while (!result.done) {
       console.log(result.value); // 1 3 5 7 9
          console.log(formData.get(result.value))
       result = it.next();
      }
      
      
        var url = dbprefix + "/upload";
        $.ajax({
          type: "POST",
          url: url,
          data: formData, // serializes the form's elements.
          cache: false,
          contentType: false,
          processData: false,
          success: function(data)
          {
              console.log("Uploaded successfully!"); // show response from the php script.
          }
        });
      
      });
      


    GetDbFileNames1();



});


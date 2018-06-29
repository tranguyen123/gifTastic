$(document).ready(function() {
    //array of animals
        var animals = ["Cat", "Dog", "Duck", "tiger"];
        console.log(animals);
    
    //renders character buttons
        function renderButtons() {
            $('#buttons-view').empty();
    
            for (var i = 0; i < animals.length; i++) {
    
                var newButton = $("<button class='btn btn-primary btn-lg active'>");
                newButton.attr("data-animals", animals[i]);
                newButton.text(animals[i]);
    
                $("#buttons-view").append(newButton);
            }
        }
        renderButtons();
    $("#character-form").submit(function (event) {
        event.preventDefault()
        animals.push( event.target[0].value);
        renderButtons();
    })
        // pushes array items to DOM
        $("#add-animals").on("click", function(event) {
            event.preventDefault();
            var char = $("#animals-input").val().trim();
            animals.push(char);
            renderButtons();
        });
        
    
    
    
        // changed "doucment" listener to more specific #buttons-view
        $("#buttons-view").on("click", ".btn-primary", function(event) {
    
            var name = event.target.innerText;
             
            
            //API calls retunrs 15 repsonses only 1 loads...
            var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + name + "&api_key=SKGatHHLMNKlm4Bk96zP41fUy6hndhlL&limit=12";
            console.log(queryURL);
        //calls giphy API
        $.ajax({
            url: queryURL,
            method: 'GET'
        })
            .then(function(response) {
                var results = response.data;
                // console.log(results);
            //assigned variables to still image and gif
            results.forEach(element => {
                // console.log(element);
                
            var pic = ' <div class="col-4" class="gifs-appear-here">'
            +
            '<img src="'+element.images.original.url +'" class="image">'+
               ' <br>'+
                '<p><h2 class="rating"></h2></p>'+
                '<br>'+
            '</img>'+
            ' </div>'
                console.log(pic)
                $("#pics").append(pic)
            });
            //     var stillImage = results[0].images.original_still.url
            //     var gifImage = results[0].images.original.url
            // //loads rating object to html with click on character button
            //     $('.rating').html('Rated: ' + results[0].rating);
            // //loads still image with click of character button
            //     $('.image').html('<img class="img-thumbnail" src="' + gifImage + ' "data-state="still"' + '>');
    
            });
            // <div class="col-xs-12 col-md-12" id="gifs-appear-here">
            //     <p class="image">
            //         <br>
            //         <p><h2 class="rating"></h2></p>
            //         <br>
            //     </p>
            // </div>
            //supposed to add clicking event to image that changes src of still image to gif
            // $(".img-thumbnail").on({
            //     'click': function() {
            //         var src = ($(this).attr('src') === stillImage) ?
            //             stillImage :
            //             gifImage;
            //         $(this).attr('src', src);
            //         console.log(img-thumbnail);
    
            //     }
            // });
    
        });
    
    
    });
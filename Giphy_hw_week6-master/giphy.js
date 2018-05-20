var animalSet = [];

//sends user input  from form to giphy api
$('#findAnimal').on('click', function(){
  var userAnimal = $('#getAnimal').val().trim();
  //store animal in array
  animalSet.push(userAnimal);
  $('#getAnimal').val('');
  //get the entered animal in the array and make it a button
  makeButton(animalSet[animalSet.length-1]);
  //add url for button?
  return false;//to not refresh the page
});
$(document).on('click','.animalButtons', displayAnimalImages)
$(document).on('click', '.animalPictures', toggleAnimalImages)

function makeButton(add_to_list){// creates dynamic button under the forms input section 
  var newDiv = $('<div class="col-md-8 buttonContainer">')
  
  var newButton = $('<button class="btn btn-info btn-block animalButtons">');
  newButton.attr('id', add_to_list);
  newButton.attr('data-name', add_to_list);
  newButton.text(add_to_list);

  newDiv.append(newButton); // appends new button for animal name entered in form
  $('#animalButtonSection').append(newDiv);
}

function displayAnimalImages(){// retrieves the animal gifs from gyphy api 
  var animal = $(this).attr('data-name');
  var queryURL = "http://api.giphy.com/v1/gifs/search?limit=10&q=funny+" + animal + "&api_key=dc6zaTOxFJmzC"

  $.ajax({url:queryURL, method:'GET'}).done(function(response){

    $('#imageContainer').empty(); // sends retrieved gifs to dynamic containers

    for(i = 0; i < response.data.length; i++){
      var gifRating = response.data[i].rating;
      var gifURL = response.data[i].images.fixed_width.url;
      var gifStill = response.data[i].images.fixed_width_still.url;
      
      //create div container for gifs
      var newDiv = $('<div class="col-md-4">');
      newDiv.attr('id', 'imgDiv' + i);
      newDiv.text('Rating: ' + gifRating);

      var renderedImg = imageRender(i,gifURL,gifStill); // renders image to divs & container
      newDiv.append(renderedImg);
      $('#imageContainer').append(newDiv);
    }
  });
}
function imageRender(count, url, still){ //resets & loads new gifs 
  var newImg = $('<img class="animalPictures">');
  newImg.attr('data-gif', url);
  newImg.attr('data-still-image', still);
  newImg.attr('data-still-switch', 'true')
  newImg.attr('id', 'img' + count);
  newImg.attr('src', still);
  return newImg;
}
function toggleAnimalImages(){
  if($(this)[0].dataset.stillSwitch == 'false'){
    $(this)[0].src = $(this)[0].dataset.stillImage;
    $(this)[0].dataset.stillSwitch = 'true';
  }
  else{
    $(this)[0].src = $(this)[0].dataset.gif;
    $(this)[0].dataset.stillSwitch = 'false';
  }
}
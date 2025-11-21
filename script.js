$(function() { // Makes sure that your function is called once all the DOM elements of the page are ready to be used.
    
    // Called function to update the name, happiness, and weight of our pet in our HTML
    checkAndUpdatePetInfoInHtml();
  
    // When each button is clicked, it will "call" function for that button (functions are below)
    $('.treat-button').click(clickedTreatButton);
    $('.play-button').click(clickedPlayButton);
    $('.exercise-button').click(clickedExerciseButton);
    $('.sleep-button').click(clickedSleepButton);

    //MY TWO JQUERY METHODS .css() & .hover()
    //HOW I USED THEM
    // .css() -> changes style of photo
    // .hover()-> reacts when we hover the photo

    $('.pet-image').hover(
    function () {
    const $img = $(this);

    const originalSrc = $img.attr('src');
    $img.data('original-src', originalSrc);

    const rainbowSrc = originalSrc.replace('.png', 'Rainbow.png');

    $img.attr('src', rainbowSrc);

    $img.css({
      'box-shadow': '0 0 30px #bf34ffff',
      'transition': '0.3s',
    });
  },
  function () {
    const $img = $(this);

    const originalSrc = $img.data('original-src');

    if (originalSrc) {
      $img.attr('src', originalSrc);
    }

    $img.css({
      'box-shadow': 'none',
    });
  }
);
    
  })


  
    // Add a variable "pet_info" equal to a object with the name (string), weight (number), and happiness (number) of your pet
    var pet_info = {name:"DAISY", weight:8, happiness:0, energy:100};

    const petImage = document.getElementById("petImage");

    function stayEnergy(){
    if (pet_info.energy > 100) pet_info.energy = 100;
    if (pet_info.energy < 0) pet_info.energy = 0;
  }
    
    function drainEnergy(){
      pet_info.energy -= 10;

      if (pet_info.energy <= 0){
        pet_info.energy = 0;
        clickedSleepButton();
        return true;
      }
      return false;

    }

    //MY NEW OWN BUTTION
    function clickedSleepButton(){
      // Set pet happiness to 10
      pet_info.happiness = 10;
      // Set pet weight to 8
      pet_info.weight = 8;

      pet_info.energy = 100;
      //SHOW MESSAGE
      showMessage("Daisy is sleeping");
      //SET PICTURE
      petImage.src = "images/sleep.png";
      //border animation
      petImage.classList.add("sleep-glow");
      updatePetInfoInHtml(); 
    }

    function clickedTreatButton() {
      // Increase pet happiness
      pet_info.happiness += 1;
      // Increase pet weight
      pet_info.weight += 0.5;
      pet_info.energy += 10;
      stayEnergy();
      petImage.classList.remove("sleep-glow");
      checkAndUpdatePetInfoInHtml();
      }
    
    
    function clickedPlayButton() {
      // Increase pet happiness
      pet_info.happiness +=1;
      // Decrease pet weight
      pet_info.weight -= 0.5;
      petImage.classList.remove("sleep-glow");

      const wentSleep = drainEnergy();
      if (!wentSleep){
        checkAndUpdatePetInfoInHtml();
    }
  }
    
    function clickedExerciseButton() {
      // Decrease pet happiness
      pet_info.happiness -= 0.5;
      // Decrease pet weight
      pet_info.weight -= 0.5;
      petImage.classList.remove("sleep-glow");
      
      const wentSleep = drainEnergy();
      if (!wentSleep){
        checkAndUpdatePetInfoInHtml();
    }
  }
  
    function checkAndUpdatePetInfoInHtml() {
      checkWeightAndHappinessBeforeUpdating();  
      updatePetInfoInHtml();
    }
    
    function checkWeightAndHappinessBeforeUpdating() {
      if(pet_info.happiness < 0){
        pet_info.happiness = 0;
      }
      if(pet_info.weight < 0){
        pet_info.weight = 0;
      }


      //TIRED
      if (pet_info.weight <= 7) {
          petImage.src = "images/tired.png";
          showMessage("Daisy is tired");

      //SAD
      } else if (pet_info.happiness < 3 || pet_info.weight < 9) {
          petImage.src = "images/sad.png";
          showMessage("Play with Daisy");

      //NORMAL
      } else if (pet_info.weight >= 9 && pet_info.weight <= 19) {
          petImage.src = "images/normal.png";

      //HAPPY
      } else if (pet_info.weight >= 20 && pet_info.happiness >= 6) {
          petImage.src = "images/happy.png";
          showMessage("Daisy is Happy!");
      }
    }
    

    function showMessage(text) {
    let box = document.getElementById("pawMessage");
    box.style.display = "block";
    box.innerText = text;

    setTimeout(()=> {
      box.style.display = "none";
    }, 2000);
  }
    
    // Updates your HTML with the current values in your pet_info object
    function updatePetInfoInHtml() {
      $('.name').text(pet_info['name']);
      $('.weight').text(pet_info['weight']);
      $('.happiness').text(pet_info['happiness']);
      $('.energy').text(pet_info['energy']);
    }
  
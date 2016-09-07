var shopApp = {};
shopApp.apiKey = "uid6081-34742991-73";
shopApp.apiUrl = "http://api.shopstyle.com/api/v2/products?fl=r27&fl=r494&fl=r23&fl=r84&fl=r1060&fl=r483&fl=r2403fl=r1340&fl=r1787&fl=r1659&fl=r299&fl=r1402&fl=r427&fl=r165"


//get products from API

//display products
shopApp.displayClothes = function(clothingPicks, galleryID) {
	clothingPicks.forEach(function(item) {
		var clothingContainer = $("<div>").addClass("galleryItem");
		var clothingUrl = $("<a target=\"_blank\">").attr("href", item.clickUrl);
		var clothingName = $("<h3>").text(item.brandedName);
		var clothingImage = $("<div>").html($("<img>").attr("src", item.image.sizes.IPhone.url));
		clothingUrl.append(clothingName);
		clothingContainer.append(clothingUrl,clothingImage);
		$(galleryID).append(clothingContainer);
	})
	$(galleryID).flickity({
		contain: true,
		imagesLoaded: true,
		pageDots: false
	});
};

shopApp.getClothes = function (color, category, galleryID) {
	var randomOffset = Math.floor(Math.random()*35);
	 $.ajax({
		url: shopApp.apiUrl,
		method: "GET",
		dataType: "json",
		data: {
			pid: shopApp.apiKey,
			format: "json",
			cat: category,
			fl: color,
			sort: "popular",
			limit: 20,
			offset: randomOffset
		}
	})
	.then(function(clothingData){
		if (clothingData.products.length > 0) {
		console.log(clothingData);
		console.log(randomOffset);
		shopApp.displayClothes(clothingData.products, galleryID);
		}
		else {
			var noResults = $("<h3>").text("No results found! Please try a different search.");
			$(galleryID).append(noResults);
		}
	});
};

//filter products from API based on color
//filer products by category
//this code allows the user to select a color and a category. on submit the reusults from shopstyle will appear and be filtered accordingly
shopApp.init = function () {
	$("#clothingFormOne").on("submit", function(e){
		e.preventDefault();
		var colorPicked = $("#clothingColorOne").val();
		var categoryPicked = $("#clothingCatOne").val();
		console.log(colorPicked, categoryPicked);
			$("#galleryOne").flickity('destroy');
			$("#galleryOne").empty();
			$("#clothingColorTwo").empty();
		shopApp.getClothes(colorPicked, categoryPicked, "#galleryOne");
		$(".hide").show("slow");
		//Loop through the selected second colours and append a new option with the value of the colour code to our clothingColor selection menu
		colorRecs[colorPicked].forEach(function(colour) {
			console.log(colour.name);
		var optionContainer = $("<option>").text(colour.name).val(colour.code);
		$("#clothingColorTwo").append(optionContainer);
		});
		$("#clothingColorTwo").prepend('<option value="" disabled selected>Clothing Color</option>');
	});
	$("#clothingFormTwo").on("submit", function(e){
		e.preventDefault();
		var colorPicked = $("#clothingColorTwo").val();
		var categoryPicked = $("#clothingCatTwo").val();
		console.log(colorPicked, categoryPicked);
		shopApp.getClothes(colorPicked, categoryPicked, "#galleryTwo");
		$("#galleryTwo").flickity('destroy');
		$("#galleryTwo").empty();
	});
	$(".reset").on("click", function(e){
		shopApp.reset();
	});
};

shopApp.reset = function () {
	$("#clothingColorOne").val("");
	$("#clothingCatOne").val("");
	$("#clothingColorTwo").val("");
	$("#clothingCatTwo").val("");
	$(".gallery").flickity('destroy');
	$(".gallery").empty();
	$(".hide").hide();
}



$(function(){
	shopApp.init();
});







//when user hits submit, we want to retreive the color value they picked

//based on the color value, we want to give 3 color values for the next drop down menu


var colorRecs = {
	c7: [{
			code: "c15",
			name: "White"
		}, 
		{
			code: "c16",
			name: "Black"
		}, 
		{	code: "c20",
			name: "Beige"
		}],
	c3: [{
			code: "c15",
			name: "White"
		},	
		{
			code: "c16",
			name: "Black", 
			
			code: "c10",
			name: "Blue"
		}],
	c4: [{
			code: "c15",
			name: "White"
		},
		{
			code: "c16",
			name: "Black"
		},
		{
			code: "c10",
			name: "Blue"
		}],
	c13: [{
			code: "c20",
			name: "Beige"
		},
		{ 
			code:"c1",
			name: "Brown"
		},
		{ 
			code:"c15",
			name: "White"
		}],
	c10: [{
			code: "c17",
			name: "Pink",
		},
		{
			code: "c15",
			name: "White"
		},
		{
			code: "c20",
			name: "Beige"
		}],
	c8: [{
			code: "c10",
			name: "Blue"
		},
		{
			code: "c15",
			name: "White"
		},
		{
			code: "c14",
			name: "Grey"
		}],
	c17: [{
			code: "c16",
			name: "Black"
		},
		{
			code: "c14",
			name: "Grey"
		},
		{
			code: "c10",
			name: "Blue"
		}],
	c16: [{
			code: "c16",
			name: "Black",
		},
		{
			code:"c15",
			name: "White"
		},
		{
			code: "c19",
			name: "Silver"
		}],
	c15: [{
			code: "c16",
			name:"Black"
		},
		{	
			code: "c10",
			name: "Blue"
		},
		{
			code: "c17",
			name: "Pink"
		}],
	c14: [{
			code: "c15",
			name: "White"
		},
		{ 
			code: "c19",
			name: "Silver" 
		},
		{
			code: "c17",
			name: "Pink"
		}],
	c20: [{
			code:"c10",
			name: "Blue"
		},
		{
			code: "c13", 
			name: "Green"
		},
		{
			code: "c7",
			name: "Red"
		}],
	c1: [{
			code: "c13",
			name: "Green"
		},
		{ 
			code: "c10",
			name: "Blue"
		},
		{
			code: "c15",
			name: "White"
		}],
	c18: [{
			code:"c10",
			name: "Blue",
		},
		{
			code: "c16",
			name: "Black"
		},
		{
			code: "c7",
			name: "Red"
		}],
	c19: [{
			code: "c10",
			name: "Blue"
		},
		{
			code: "c15",
			name: "White"
		},
		{
			code: "c19",
			name: "Silver"
		}]
};

// var colorKey = {
// 	c7: "Red",
// 	c3: "Orange",
// 	c4: "Yellow",
// 	c13: "Green",
// 	c10: "Blue",
// 	c8: "Purple",
// 	c17: "Pink",
// 	c16: "Black",
// 	c15: "White",
// 	c14: "Grey",
// 	c20: "Beige",
// 	c1: "Brown",
// 	c18: "Gold",
// 	c19: "Silver"
// }

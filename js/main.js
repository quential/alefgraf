$(document).ready(function() {




	// Init main page slider
	var mainSlider = $("#mainPageSlider");

	mainSlider.flickity({
		cellSelector: ".slide",
		pageDots: false,
		prevNextButtons: false,
		autoPlay: 4000,
		wrapAround: true
	});

	$(".slider__arrow--left").on('click', function() {
		mainSlider.flickity('previous');
	});
	$(".slider__arrow--right").on('click', function() {
		mainSlider.flickity('next');
	});




	// Init books slider on main page
	var mainWorkSlider = $("#mainWorkSlider");

	mainWorkSlider.flickity({
		cellSelector: ".col-md-6",
		pageDots: true,
		prevNextButtons: false,
		autoPlay: 4000,
		contain: true,
		cellAlign: 'left',
		wrapAround: true
	});




	// Init map
	function initializeMainMap() {

		var mapOptions, map, myLatLng, imageMarker, marker;

		mapOptions = {
			zoom: 19,
			disableDefaultUI: true,
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			center: new google.maps.LatLng(42.975473, 47.510535)
		}

		map = new google.maps.Map(document.getElementById('mainMap'), mapOptions);

		myLatLng = new google.maps.LatLng(42.9754624,47.5090966);

		marker = new google.maps.Marker({
			position: myLatLng,
			map: map,
			title: "Типография Алеф"
		});


	}

	initializeMainMap();

});




$(".flickity-viewport").each(function() {
	$(this).css("z-index","1000");
});


// Глобальныйе настройки заказа


var options = {
	tir: 0,

	tirPrice:      0.00,
	tirPriceColor: 5.19,

	pages:        0,
	pages_simple: 0,
	pages_color:  0,

	covertype: 65.5,
	side:      13.2,

	coverCategory: 'simple',

	coverdesign: false,
	isbn:        false,
	udkbbk:      false,
	sending:     false,
	rinc:        false,
	markup:      false,
	correct:     false,
	typing:      false
}

options.pages_simple = options.pages - options.pages_color;

function statusLog() {
	// return false;
	function ruBool(answer) {return answer ? "Да" : "Нет"}

	console.groupCollapsed('Рассчет стоимости');

	console.log('Тираж: ' + options.tir);
	console.log('Цена за страницу: '           + options.tirPrice);
	console.log('Количество страниц: '         + options.pages);
	console.log('Количество обычных страниц: ' + options.pages_simple);
	console.log('Количество цветных страниц: ' + options.pages_color);
	console.log('Стоимость обычных страниц: '  + options.pages_simple/1 * options.tirPrice/1);
	console.log('Стоимость цветных страниц: '  + options.pages_color/1 * options.tirPriceColor/1);
	console.log('Общая стоимость страниц: '    + (options.pages_simple/1 * options.tirPrice/1 + options.pages_color/1 * options.tirPriceColor/1));

	console.log('Стоимость обложки: ' + options.covertype);
	console.log('Переплет за 1 книгу: ' + options.side);

	console.log('Цветные страницы: ' + ruBool(options.colored));
	console.log('Дизайн обложки  : ' + ruBool(options.coverdesign));
	console.log('ISBN            : ' + ruBool(options.isbn));
	console.log('УДК ББК         : ' + ruBool(options.udkbbk));
	console.log('Рассылка        : ' + ruBool(options.sending));
	console.log('РИНЦ            : ' + ruBool(options.rinc));
	console.log('Верстка         : ' + ruBool(options.markup) + '(' + options.pages + ' x 20р)');
	console.log('Корректировка   : ' + ruBool(options.correct) + '(' + options.pages + ' x 56р)');
	//console.log('Распечатка      : ' + ruBool(options.typing) + '(' + options.pages + ' x 1.5р)');

	console.groupEnd();
}

// statusLog();



// Меняем тираж
$("#tiraj").on('change', function() {
	var tir = $(this).val();

	options.tir = tir;

	if (tir >= 2000)
		options.tirPrice = 0.53

	else if (tir >= 1500 && tir < 2000)
		options.tirPrice = 0.57

	else if (tir >= 1000 && tir < 1500)
		options.tirPrice = 0.62

	else if (tir >= 700 && tir < 1000)
		options.tirPrice = 0.68

	else if (tir >= 500 && tir < 700)
		options.tirPrice = 0.73

	else if (tir >= 300 && tir < 500)
		options.tirPrice = 0.79

	else if (tir >= 200 && tir < 300)
		options.tirPrice = 0.86

	else if (tir >= 150 && tir < 200)
		options.tirPrice = 0.93

	else if (tir >= 100 && tir < 150)
		options.tirPrice = 1

	else if (tir >= 70 && tir < 100)
		options.tirPrice = 1.10

	else if (tir >= 50 && tir < 70)
		options.tirPrice = 1.19

	else if (tir >= 40 && tir < 50)
		options.tirPrice = 1.29

	else if (tir >= 30 && tir < 40)
		options.tirPrice = 1.4

	else if (tir >= 25 && tir < 30)
		options.tirPrice = 1.52

	else if (tir >= 20 && tir < 25)
		options.tirPrice = 1.65

	else if (tir >= 10 && tir < 20)
		options.tirPrice = 1.79

	else if (tir >= 5 && tir < 10)
		options.tirPrice = 1.94

	else if (tir >= 1 && tir < 5)
		options.tirPrice = 2.1

	$(this).next().html("&nbsp;&nbsp;&nbsp;1 стр. - " + options.tirPrice + " р.");

	recountCoverPrice(tir);

	// statusLog();
});


// Меняем количество страниц
$("#pagesamount").on('change', function() {
	options.pages = $(this).val();
  options.pages_simple = options.pages - options.pages_color;
	// statusLog();
});


// Меняем количество цветных страниц
$("#pagesamount_colored").on('change', function() {
	options.pages_color = $(this).val();
	options.pages_simple = options.pages - options.pages_color;

	if ($(this).val() > 0) {
		$("#color-page-print-type").attr("disabled", false);
		$("#color-page-print-type").attr("title", "Тип печати цветных страниц");
	} else {
		$("#color-page-print-type").attr("disabled", true);
		$("#color-page-print-type").attr("title", "Укажите количество цветных страниц");
	}
	// statusLog();
});


// Меняем тип обложки
$("#color-page-print-type, #tiraj").change( function() {
	var colorPageType = $("#color-page-print-type").find("option:selected").val();
  
  var
    streamPrices = [5.2, 4.7, 4.3, 3.9, 3.6, 3.3, 3, 2.7, 2.5, 2.3, 2.1, 1.9, 1.7, 1.6, 1.4, 1.3, 1.2, 1,1],
    laserPrices  = [7.8, 7.3, 6.9, 6.5, 6.2, 5.8, 5.5, 5.2, 4.9, 4.6, 4.4, 4.1, 3.9, 3.9, 3.9, 3.9, 3.9, 3.9];

  var countFactor;

  options.tir = parseInt(options.tir);

       if (options.tir >= 2000)                      countFactor = 17;
  else if (options.tir >= 1500 && options.tir < 2000) countFactor = 16;
  else if (options.tir >= 1000 && options.tir < 1500) countFactor = 15;
  else if (options.tir >= 700 && options.tir < 1000) countFactor = 14;
  else if (options.tir >= 500 && options.tir < 700) countFactor = 13;
  else if (options.tir >= 300 && options.tir < 500) countFactor = 12;
  else if (options.tir >= 200 && options.tir < 300) countFactor = 11;
  else if (options.tir >= 150 && options.tir < 200) countFactor = 10;
  else if (options.tir >= 100 && options.tir < 150) countFactor = 9;
  else if (options.tir >= 70 && options.tir < 100) countFactor = 8;
  else if (options.tir >= 50 && options.tir < 70) countFactor = 7;
  else if (options.tir >= 40 && options.tir < 50) countFactor = 6;
  else if (options.tir >= 30 && options.tir < 40) countFactor = 5;
  else if (options.tir >= 25 && options.tir < 30) countFactor = 4;
  else if (options.tir >= 20 && options.tir < 25) countFactor = 3;
  else if (options.tir >= 10  && options.tir < 20) countFactor = 2;
  else if (options.tir >= 5  && options.tir < 10)  countFactor = 1;
  else if (options.tir >= 1   && options.tir < 5)  countFactor = 0;

  switch (colorPageType) {
		case 'stream':
			options.tirPriceColor = streamPrices[ countFactor ];
			break;

		case 'lazer':
			options.tirPriceColor = laserPrices[ countFactor ];
			break;

    default: break;
  }

	statusLog();
});


// Меняем тип обложки
$("#covertype").change( function() {
	var coverType = $(this).find("option:selected").val();
	options.coverCategory = coverType;

	recountCoverPrice(options.tir);

	console.log(options.covertype);

	// statusLog();
});

// Меняем тип переплета
$("#sidetype").change( function() {
	var sideType = $(this).find("option:selected").val();
	
	if (sideType !== 'knit' && sideType !== undefined)
		options.side = sideType;
	else
		options.side = 0.6 * options.pages;

	// statusLog();
});



function recountCoverPrice(tir) {
	var
		simplePrices = [65.5, 59.7, 54.3, 49.4, 45, 41, 37.3, 34, 30.9, 28.2, 25.6, 23.3, 21.3, 19.4, 17.6, 16, 14.6, 13.3],
		glancePrices = [105, 95, 86, 78, 71, 64, 58, 53, 48, 44, 40, 36, 33, 29, 27, 24, 22, 20],
		solidPrices  = [328, 308, 290, 273, 256, 241, 227, 213, 201, 189, 177, 167, 157, 148, 139, 131, 123, 116];

	var countFactor;

	options.tir = parseInt(options.tir);

	     if (options.tir >= 2000)                      countFactor = 17;
	else if (options.tir >= 1500 && options.tir < 2000) countFactor = 16;
	else if (options.tir >= 1000 && options.tir < 1500) countFactor = 15;
	else if (options.tir >= 700  && options.tir < 1000) countFactor = 14;
	else if (options.tir >= 500  && options.tir < 700)  countFactor = 13;
	else if (options.tir >= 300 && options.tir < 500) countFactor = 12;
	else if (options.tir >= 200 && options.tir < 300) countFactor = 11;
	else if (options.tir >= 150  && options.tir < 200) countFactor = 10;
	else if (options.tir >= 100  && options.tir < 150)  countFactor = 9;
	else if (options.tir >= 70  && options.tir < 100)  countFactor = 8;
	else if (options.tir >= 50 && options.tir < 70) countFactor = 7;
	else if (options.tir >= 40 && options.tir < 50) countFactor = 6;
	else if (options.tir >= 30  && options.tir < 40) countFactor = 5;
	else if (options.tir >= 25  && options.tir < 30)  countFactor = 4;
	else if (options.tir >= 20 && options.tir < 25) countFactor = 3;
	else if (options.tir >= 10  && options.tir < 20) countFactor = 2;
	else if (options.tir >= 5  && options.tir < 10)  countFactor = 1;
	else if (options.tir >= 1   && options.tir < 5)  countFactor = 0;

	switch (options.coverCategory) {
		case 'simple':
			options.covertype = simplePrices[ countFactor ];
			break;

		case 'glance':
			options.covertype = glancePrices[ countFactor ];
			break;

		case 'solid':
			options.covertype = solidPrices[ countFactor ];
			break;

		default: break;
	}

	console.log('Перерассчитанная стоимость обложки: ' + options.covertype);
}





// Дизайн обложки
$("#coverdesign").change( function() {
	$(this).is(":checked") ? options.coverdesign = true : options.coverdesign = false;

	// statusLog();
});

// ISBN
$("#isbn").change( function() {
	$(this).is(":checked") ? options.isbn = true : options.isbn = false;

	// statusLog();
});

// УДК, ББК
$("#udkbbk").change( function() {
	$(this).is(":checked") ? options.udkbbk = true : options.udkbbk = false;

	// statusLog();
});

// Рассылка
$("#sending").change( function() {
	$(this).is(":checked") ? options.sending = true : options.sending = false;

	// statusLog();
});

// РИНЦ
$("#rinc").change( function() {
	$(this).is(":checked") ? options.rinc = true : options.rinc = false;

	// statusLog();
});

// Верстка макета
$("#markup").change( function() {
	$(this).is(":checked") ? options.markup = true : options.markup = false;

	// statusLog();
});

// Корректура
$("#correct").change( function() {
	$(this).is(":checked") ? options.correct = true : options.correct = false;

	// statusLog();
});

// Распечатка
$("#typing").change( function() {
	$(this).is(":checked") ? options.typing = true : options.typing = false;

	// statusLog();
});

// Сканирование
$("#tis").change( function() {
	$(this).is(":checked") ? options.tis = true : options.tis = false;

	// statusLog();
});



var book = new Book( options );

// var price = book.countPrice();
// // var priceOne = book.countOneBookPrice();
// $("#bookPrice").text( price + " р. (" + parseInt(price/options.tir ) + " р. за 1 экземпляр)" );

$(".calc-count-button").on('click', function() {
  $(".calc-price").css("opacity", "1");
	recountCoverPrice(options.tir);

	var book  = new Book( options );
	var price = book.countPrice();

  if (price && !isNaN(price) && price !== "NaN") {
    $("#bookPrice").text(price + " р. (" + parseInt(price / options.tir) + " р. за 1 экземпляр)");
  } else {
    $(".calc-price").css("opacity", "0");
  }
    
	statusLog();

});












function Book(options) {
	var opts = options;

	this.countPrice = function() {

		var simplePagesPrice = opts.tirPrice/1      * opts.pages_simple/1;
		var colorPagesPrice  = opts.tirPriceColor/1 * opts.pages_color/1;

    var commonPagesPrice = simplePagesPrice + colorPagesPrice;

    // Тираж умножаем на общую стоимость страниц
    if (commonPagesPrice > 0) {
      var newPrice = opts.tir/1 * ( commonPagesPrice + opts.covertype/1 + opts.side/1 );
    } else return 0;

		// Фиксированные опции, зависимые от тиража
		opts.markup  ? newPrice += (20   * (opts.pages/1)) : 0;
		opts.correct ? newPrice += (56  * (opts.pages/1)) : 0;
		opts.typing  ? newPrice += (5 * (opts.pages/1)) : 0;

		// Фиксированные одноразовые опции
		opts.coverdesign ? newPrice += 700  : '';
		opts.isbn        ? newPrice += 3200 : '';
		opts.udkbbk      ? newPrice += 340  : '';
		opts.sending     ? newPrice += 600  : '';
		opts.rinc        ? newPrice += 900  : '';

		return Math.floor(newPrice);
	};
}





















var BookItems = [

	{
		image  : "1.jpg",
		title  : "Известия",
		author : "ДГПУ",
		desc   : "Журнал входит в Перечень ведущих рецензируемых научных журналов и изданий, в которых должны быть опубликованы основные научные результаты диссертаций",
	},

	{
		image  : "2.jpg",
		title  : "Известия чеченского государственного педагогического института",
		author : "ЧГПИ",
		desc   : "",
	},

	{
		image  : "3.jpg",
		title  : "Вестник института истории, археологии и этнографии",
		author : "ДГПУ",
		desc   : "Журнал входит в Перечень ведущих рецензируемых научных журналов и изданий, в которых должны быть опубликованы основные научные результаты диссертаций",
	},

	{
		image  : "4.jpg",
		title  : "Управление развитием капитального строительства в Чеченской Республике",
		author : "Кадыров Р. А.",
		desc   : "В монографии изложены теоретические и методологические основы управления развитием капитального строительства в Чеченской Республике.",
	},

	{
		image  : "5.jpg",
		title  : "Дербент - город трех религий",
		author : "Материалы Международной научно-практической конференции",
		desc   : "Сборник содержит тексты докладов и сообщений участников международной научно-практической конференции и отражает плюрализм мнений авторов. Предназначен для исследователей и специалистов, студентов, аспирантов и преподавателей.",
	},

	{
		image  : "6.jpg",
		title  : "Геология и ресурсы Дагестана",
		author : "Труды Института геологии Дагестанского научного центра РАН.",
		desc   : "Ученым советом Института геологии ДНЦ РАН в 2005 году было принято решение о выпуске серии книг, посвященных основоположникам становления геологической науки Дагестана и Северного Кавказа, с целью освещения их научного вклада и увековечения  памяти. ",
	},

	{
		image  : "7.jpg",
		title  : "Дагестан в системе международных отношений",
		author : "Кидирниязов Д.С.",
		desc   : "В монографии на фоне сложных исторических событий XVIII-20-х гг. XIXв. рассматривается роль и место Дагестана в международных отношениях региона. Также дан краткий очерк социально-экономического положения и административно-государственного устройства Дагестана.",
	},

	{
		image  : "8.jpg",
		title  : "Городское самоуправление в Дагестане во второй половине XIX – начале XX века",
		author : "Салихова Л.Б. ",
		desc   : "Монография посвящена городскому самоуправлению в Дагестане. В работе анализируется деятельность органов Темир-Хан-Шуринского, Дербентского и Петровского (упрощенных) городских общественных управлений в вопросах развития экономики",
	},

	{
		image  : "9.jpg",
		title  : "Этнокультурные ландшафты на постсоветском пространстве",
		author : "",
		desc   : "Настоящая коллективная монография стала результатом работы участников научного семинара, проведенного в г. Махачкале 23 октября 2014 года в рамках юбилейных празднований, посвященных 90-летию ИИАЭ ДНЦ РАН.",
	},

	{
		image  : "10.jpg",
		title  : "Дагестан в творчестве русских и европейских художников",
		author : "Гейбатова Л.Г.",
		desc   : "Книга представляет собой первое монографическое исследование, посвященное наиболее раннему и наименее изученному периоду формирования русско-дагестанских связей в области изобразительного искусства",
	},

	{
		image  : "11.jpg",
		title  : "Кавказ и Ближний Восток: от Каспийского похода Петра I до распада державы Надир-шаха",
		author : "",
		desc   : "В сборник включены доклады и выступления, озвученные на Международной научной конференции, проведенной в рамках «Года Российской истории».",
	},

	{
		image  : "12.jpg",
		title  : "Северокавказский город в региональном историческом процессе",
		author : "Материалы международной научной конференции",
		desc   : "В книге показаны урбанизационные процессы на Северном Кавказе за большой исторический период. Рассматриваются города и городское население Северного Кавказа в древний и средневековый периоды",
	},

	{
		image  : "13.jpg",
		title  : "Дагестанский социологический сборник",
		author : "ДНЦ РАН",
		desc   : "Сборник составлен по результатам плановых исследований отдела социологии Института ИАЭ ДНЦ . В нем рассмотрены актуальные  вопросы социальных, социально-экономических, социально-политических проблем Республики Дагестан.",
	},

	{
		image  : "14.jpg",
		title  : "Комментарий к Конституции Чеченской Республики ",
		author : "Гумашвили Л.Э., Муртазалиев В.Ю.",
		desc   : "В постатейном комментарии к тексту Конституции Чеченской Республики 23 марта 2003 года разъяснены содержания статей и термины, используемые законодателем.",
	},

	{
		image  : "15.jpg",
		title  : "Социокультурная идентичность Северного Кавказа в составе России",
		author : "Яхьяев М.Я., Поломошнов А.Ф., Гурбанов Э.А.",
		desc   : "В монографии на основе выработанной авторами парадигмы социокультурной идентичности социально-исторических организмов исследованы исторические трансформации цивилизационной идентичности народов Северного Кавказа.",
	},

	{
		image  : "16.jpg",
		title  : "На пьедестале истории. Ахмат-Хаджи Кадыров. Документальный очерк",
		author : "Алипханова Фатима Надирбековна",
		desc   : "",
	},

	{
		image  : "17.jpg",
		title  : "Поляна сказок",
		author : "Кадиев, Расул Ахмедович",
		desc   : "Сказки Расула Кадиева – художественное  отражение дагестанских и российских реалий сегодняшнего дня, сделанное в легкой, ироничной манере.  Тут и игра воображения, и гротеск, и метафоры, и притчи.  Мы встречаем  героев, знакомых по народным сказкам, и новых героев мутного времени.",
	},

	{
		image  : "18.jpg",
		title  : "Лекарственные растения и их применение в медицине",
		author : "Учебное пособие для студентов",
		desc   : "",
	},

];


var bookTemplate = _.template(
'<div class="col-md-6 col-sm-12 col-xs-12">'+
	'<div class="work__item work__item--inner">'+
		'<div class="row">'+
			'<div class="col-md-4 col-sm-4 col-xs-12 work__cover"> <img src="themes/default/img/books/<%= image %>" alt="<%= title %>"> </div>'+
			'<div class="col-md-8 col-sm-8 col-xs-12 work__description">'+
				'<h3><%= title %></h3>'+
				'<div class="author"><%= author %></div>'+
				'<div class="description"><%= desc %></div>'+
			'</div>'+
		'</div>'+
	'</div>'+
'</div>'
);

if ( $("#bookList").length )
{

	_.each(BookItems, function(el, ind) {

		var htmlString = bookTemplate(el);

		$("#bookList").append( htmlString );

	});

}

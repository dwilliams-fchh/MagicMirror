/* MagicMirror² Config Sample
 *
 * By Michael Teeuw https://michaelteeuw.nl
 * MIT Licensed.
 *
 * For more information on how you can configure this file
 * see https://docs.magicmirror.builders/configuration/introduction.html
 * and https://docs.magicmirror.builders/modules/configuration.html
 *
 * You can use environment variables using a `config.js.template` file instead of `config.js`
 * which will be converted to `config.js` while starting. For more information
 * see https://docs.magicmirror.builders/configuration/introduction.html#enviromnent-variables
 */
let config = {
	address: "0.0.0.0",	// Address to listen on, can be:
	// - "localhost", "127.0.0.1", "::1" to listen on loopback interface
	// - another specific IPv4/6 to listen on a specific interface
	// - "0.0.0.0", "::" to listen on any interface
	// Default, when address config is left out or empty, is "localhost"
	port: 8080,
	basePath: "/",	// The URL path where MagicMirror² is hosted. If you are using a Reverse proxy
	// you must set the sub path here. basePath must end with a /
	ipWhitelist: [],	// Set [] to allow all IP addresses
	// or add a specific IPv4 of 192.168.1.5 :
	// ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.1.5"],
	// or IPv4 range of 192.168.3.0 --> 192.168.3.15 use CIDR format :
	// ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.3.0/28"],

	useHttps: false,			// Support HTTPS or not, default "false" will use HTTP
	httpsPrivateKey: "",	// HTTPS private key path, only require when useHttps is true
	httpsCertificate: "",	// HTTPS Certificate path, only require when useHttps is true

	language: "en",
	locale: "en-US",
	logLevel: ["INFO", "LOG", "WARN", "ERROR"], // Add "DEBUG" for even more logging
	timeFormat: 24,
	units: "metric",

	modules: [
		{
			module: "alert",
		},
		{
			module: "updatenotification",
			position: "top_bar"
		},
		{
			module: "clock",
			position: "top_left",
			config: {
				timeFormat: 12,
				dateFormat: "dddd, MMMM Do"
			}
		},
		{
			module: "MMM-OpenWeatherMapForecast",
			header: "Weather",
			position: "top_right",
			classes: "default everyone",
			disabled: false,
			config: {
				apikey: "ad0dc7086ff6b3cb36c606dc3c698b6f",
				latitude: "44.89804366950974",
				longitude: "-123.00792846037919",
				units: "imperial",
				iconset: "4c",
				concise: true,
				maxHourliesToShow: 3,
				maxDailiesToShow: 3,
				forecastLayout: "tiled"
			}
		},
		{
			module: "MMM-BackgroundSlideshow",
			position: "fullscreen_below",
			config: {
				imagePaths: ["modules/MMM-BackgroundSlideshow/exampleImages/"],
				transitionImages: false,
				randomizeImageOrder: true
			}
		},
		{
			module: "newsfeed",
			position: "bottom_bar",
			config: {
				feeds: [
					{
						title: "Salem News",
						url: "https://www.flashalert.net/rss.html?id=1081"
					}
				],
				showSourceTitle: true,
				showPublishDate: true,
				broadcastNewsFeeds: true,
				broadcastNewsUpdates: true,
			}
		},
		{
			module: "MMM-Logo",
			position: "upper_third",
			config: {
				maxWidth: "18%",       // Sizes the images. Retains aspect ratio.
				ownImagePath: "/modules/HomeHealth.png",      // ex: 'modules/MMM-EyeCandy/pix/YOUR_PICTURE_NAME.jpg', or internet url to image
			}
		},
		{
			module: "MMM-DailyPower",
			position: "lower_third",       // This can be any region
			config: {
				// See 'Configuration options' for more information.
				translation: "HCSB",
				showImage: false,
				verseColor: "#fff",
				verseSize: "1.5vw"
			}
		},
		// {
		// 	module: "MMM-TrafficMap",
		// 	position: "bottom_left",
		// 	config: {
		// 		key: "RKbAY32rYRyxC132GpDdmhWou2r9zjE8",
		// 		lng: -123.0078962743303,
		// 		lat: 44.89804746946594,
		// 		mlng: -123.0078962743303,
		// 		mlat: 44.89804746946594,
		// 		zoom: 12,
		// 		traffic: "relative-delay",
		// 		showMarker: true,
		// 		height: "40vh",
		// 		width: "28vw"
		// 	}
		// },
		{
			module: 'MMM-Remote-Control',
			// uncomment the following line to show the URL of the remote control on the mirror
			// position: 'bottom_left',
			// you can hide this module afterwards from the remote control itself
			config: {
				customCommand: {},  // Optional, See "Using Custom Commands" below
				showModuleApiMenu: true, // Optional, Enable the Module Controls menu
				secureEndpoints: true, // Optional, See API/README.md
				// uncomment any of the lines below if you're gonna use it
				// customMenu: "custom_menu.json", // Optional, See "Custom Menu Items" below
				apiKey: "chasedgeese#336s", // Optional, See API/README.md for details
				// classes: {} // Optional, See "Custom Classes" below
			}
		},
		{
			module: 'MMM-SimpleText',
			position: 'bottom_left',
			config: {
				fontURL: {
					'value': 'Tahoma, Geneva, sans-serif'
				},
				fontSize: {
					'value': 'large'
				},
				fontStyle: {
					'value': 'italic'
				},
				color: {
					'value': '#FFFFFF'
				},
				refreshMs: {
					'value': '100000000'
				},
				filePath: {
					'value': 'menu.txt'
				},
			}
		},
		// {
		// 	module: "MMM-Page-Selector",
		// 	position: "top_center",
		// 	config: {
		// 		defaultPage: "main",
		// 		displayTitle: false,
		// 		selectPageNotif: ["SELECT_PAGE"],
		// 		incrementPageNotif: ["PAGE_UP"],
		// 		decrementPageNotif: ["PAGE_DOWN"],
		// 		persistentPages: true,
		// 		autoChange: {
		// 			interval: 60
		// 		}
		// 	}
		// },
	],
	// pages: {
	// 	main: {
	// 		"MMM-Logo": "middle_center"
	// 	}
	// },
	// exclusions: {
	// 	"clock": "top_left",
	// 	"MMM-OpenWeatherMapForecast": "top_right",
	// 	"MMM-BackgroundSlideshow": "fullscreen_below",
	// 	"newsfeed": "bottom_bar",
	// 	"MMM-TrafficMap": "bottom_left",
	// 	"MMM-DailyPower": "lower_third"
	// }
};

/*************** DO NOT EDIT THE LINE BELOW ***************/
if (typeof module !== "undefined") { module.exports = config; }

Module.register("MMM-TrafficMap",{

	defaults: {
		requiresVersion: "2.8.0",  //Developped and tested with this version.
		key: "",
		lang: config.language,
		height: "75vh",
		width: "75vw",
		traffic: "relative",
		refresh: (15 * 60 * 1000), //Human readable for every 15 minutes.
		showIncidents: true,
		showTraffic: true,
		showPOI: false,
		showMarker: false,
		remoteTTCSSJS: true,
		zoom: 11,
		TTVersion: "6.13.0" //Internal solution to quickly change version of TomTom API to a new version.
	},
	
	getStyles: function() {
		//Not getting data from Tomtom, will stall the module. Give the user the choice for local.
		if(this.config.remoteTTCSSJS) {
			return ["https://api.tomtom.com/maps-sdk-for-web/cdn/6.x/" +  this.config.TTVersion + "/maps/maps.css"]
		} else {
			return [this.file("tomtom-international-web-sdk-maps/maps.css")]
		}
	},
	
	start: function() {
		Log.info("Starting module: " + this.name);
		if (this.config.key === "") {
			Log.error(`${this.name}: key not set. Please read the README.md for details.`);
			return;
		}
		if (this.config.remoteTTCSSJS === true) {
			Log.info(`${this.name}: Using JS from https://api.tomtom.com/maps-sdk-for-web/cdn/6.x/${this.config.TTVersion}`);
		} else {
			Log.info(`${this.name}: Using JS from local source.`);
		}
	}, 
	
	getDom: function() {
		let wrapper = document.createElement("div");
		wrapper.setAttribute("id", "TomTomMap");
		wrapper.setAttribute("class", "map");
		wrapper.style.height = this.config.height;
		wrapper.style.width = this.config.width;
		wrapper.style.borderRadius = "3vw";
		
		let script = document.createElement("script"); //Getscripts is not working in this module.
		script.type = "text/javascript";
		if(this.config.remoteTTCSSJS) {
			script.src = "https://api.tomtom.com/maps-sdk-for-web/cdn/6.x/" + this.config.TTVersion + "/maps/maps-web.min.js";
		} else {
			script.src = this.file("tomtom-international-web-sdk-maps/maps-web.min.js");
		}
		script.setAttribute('defer','');
		script.setAttribute('async','');
		document.body.appendChild(script);
		
		var self = this;	//Fixme: why?			
				
		script.onload = function () {
			tt.setProductInfo('MagicMirror TomTom Traffic & Incidents', '2.0 Alpha');
			let map = tt.map({
				key: self.config.key,
				container: 'TomTomMap',
				center: [self.config.lng, self.config.lat],
				zoom:self.config.zoom,
				language: self.config.lang,
				interactive: true,

				style: {     
					map: 'basic_night',
					poi: 'poi_main',
					trafficIncidents: 'incidents_day',
					trafficFlow: 'flow_'+self.config.traffic,
				},
				stylesVisibility: {
					trafficFlow: self.config.showTraffic, 
					trafficIncidents: self.config.showIncidents,
					poi: self.config.showPOI
				}		
			});
			
			if( self.config.showMarker) {
				let marker = new tt.Marker({
					width: self.config.mwidth,
					height: self.config.mheight
				});
				marker.setLngLat([self.config.mlng, self.config.mlat]);
				marker.addTo(map);
			};
		
		}
		return wrapper;
	}
});

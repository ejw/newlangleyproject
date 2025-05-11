
var MachineMaps = {
  set: function() {
    mapboxgl.accessToken = "pk.eyJ1IjoiZWp3IiwiYSI6ImNpeWxxcjlkdjAwM2QzMnBqbTc2YzhvZjQifQ.87VfRf6tCdmvmZNj5SXZaw";
  },

  hasMapElement: function(map_element_id) {
    if (document.getElementById(map_element_id)) {
      return true;
    }
    else {
      return false;
    }
  },

  addMachineAreaPolygon: function(map, polygon_element, boundary_points) {
    map.on('load', function() {
      var polygon_id = polygon_element.attr('data-code');
      var source_id = 'polygon_' + polygon_id;
      var pts = [];
      polygon_element.find('span').each(function() {
        var lat = $(this).attr('data-latitude');
        var lon = $(this).attr('data-longitude');
        pts.push( [parseFloat(lon), parseFloat(lat)] );
      });
      map.addSource(source_id, {
        'type': 'geojson',
        'data': {
          'type': 'Feature',
          'geometry': {
            'type': 'Polygon',
            'coordinates': [ pts ]
          }
        }
      });
      map.addLayer({
        'id': source_id,
        'type': 'fill',
        'source': source_id,
        'layout': {},
        'paint': {
          'fill-color': polygon_element.attr('data-color'),
          'fill-opacity': parseFloat(polygon_element.attr('data-fill-opacity'))
        }
      });
      map.addLayer({
        'id': source_id + '-border-outline',
        'type': 'line',
        'source': source_id,
        'paint': {
          'line-width': 1,
          'line-color': polygon_element.attr('data-border-color')
        }
      });
      if (boundary_points == true) {
        polygon_element.find('span').each(function() {
          var lat = $(this).attr('data-latitude');
          var lon = $(this).attr('data-longitude');
          var popup  = new mapboxgl.Popup({ offset: 25 }).setLngLat([parseFloat(lon), parseFloat(lat)]).setHTML('<div>' + lat + '</div><div>' + lon + '</div>');
          var marker = new mapboxgl.Marker().setLngLat([parseFloat(lon), parseFloat(lat)]).setPopup(popup).addTo(map);
        });
      }
    });
  }
}

var MachineAreas = {
  setMaps: function() {
    if (MachineMaps.hasMapElement('map_areas_municipalities')) {
      var iii = $('#map_areas_municipalities');
      var map = new mapboxgl.Map({
        container: 'map_areas_municipalities',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [parseFloat(iii.attr('data-longitude')), parseFloat(iii.attr('data-latitude'))],
        zoom: parseInt(iii.attr('data-zoom'))
      });
      $('#map_areas_municipalities_polygons > div').each(function() {
        MachineMaps.addMachineAreaPolygon(map, $(this), iii.attr('data-boundary-points'));
      });
    }
    if (MachineMaps.hasMapElement('map_areas_tol_communities')) {
      var iii = $('#map_areas_tol_communities');
      var map = new mapboxgl.Map({
        container: 'map_areas_tol_communities',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [parseFloat(iii.attr('data-longitude')), parseFloat(iii.attr('data-latitude'))],
        zoom: parseInt(iii.attr('data-zoom'))
      });
      $('#map_areas_tol_communities_polygons > div').each(function() {
        MachineMaps.addMachineAreaPolygon(map, $(this), iii.attr('data-boundary-points'));
      });
    }
    if (MachineMaps.hasMapElement('map_areas_tol_neighbourhoods')) {
      var iii = $('#map_areas_tol_neighbourhoods');
      var map = new mapboxgl.Map({
        container: 'map_areas_tol_neighbourhoods',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [parseFloat(iii.attr('data-longitude')), parseFloat(iii.attr('data-latitude'))],
        zoom: parseInt(iii.attr('data-zoom'))
      });
      $('#map_areas_tol_neighbourhoods_polygons > div').each(function() {
        MachineMaps.addMachineAreaPolygon(map, $(this), iii.attr('data-boundary-points'));
      });
    }
    if (MachineMaps.hasMapElement('map_areas_col_communities')) {
      var iii = $('#map_areas_col_communities');
      var map = new mapboxgl.Map({
        container: 'map_areas_col_communities',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [parseFloat(iii.attr('data-longitude')), parseFloat(iii.attr('data-latitude'))],
        zoom: parseInt(iii.attr('data-zoom'))
      });
      $('#map_areas_col_communities_polygons > div').each(function() {
        MachineMaps.addMachineAreaPolygon(map, $(this), iii.attr('data-boundary-points'));
      });
    }
    if (MachineMaps.hasMapElement('map_areas_electoral_districts')) {
      var iii = $('#map_areas_electoral_districts');
      var map = new mapboxgl.Map({
        container: 'map_areas_electoral_districts',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [parseFloat(iii.attr('data-longitude')), parseFloat(iii.attr('data-latitude'))],
        zoom: parseInt(iii.attr('data-zoom'))
      });
      $('#map_areas_electoral_districts_polygons > div').each(function() {
        MachineMaps.addMachineAreaPolygon(map, $(this), iii.attr('data-boundary-points'));
      });
    }
    if (MachineMaps.hasMapElement('map_areas_federal_ridings')) {
      var iii = $('#map_areas_federal_ridings');
      var map = new mapboxgl.Map({
        container: 'map_areas_federal_ridings',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [parseFloat(iii.attr('data-longitude')), parseFloat(iii.attr('data-latitude'))],
        zoom: parseInt(iii.attr('data-zoom'))
      });
      $('#map_areas_federal_ridings_polygons > div').each(function() {
        MachineMaps.addMachineAreaPolygon(map, $(this), iii.attr('data-boundary-points'));
      });
    }
  }
}

var MachineAddresses = {
  setMaps: function() {
    if (MachineMaps.hasMapElement('map_home_address')) {
      var iii = $('#map_home_address');
      var map = new mapboxgl.Map({
        container: 'map_home_address',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [parseFloat(iii.attr('data-longitude')), parseFloat(iii.attr('data-latitude'))],
        zoom: parseInt(iii.attr('data-zoom'))
      });
      var marker = new mapboxgl.Marker().setLngLat([parseFloat(iii.attr('data-longitude')), parseFloat(iii.attr('data-latitude'))]).addTo(map);
    }
    // typeof callback === 'function' && callback();
  }
}

var MachineProperties = {
  setMaps: function() {
    if (MachineMaps.hasMapElement('map_property_view')) {
      var iii = $('#map_property_view');
      var map = new mapboxgl.Map({
        container: 'map_property_view',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [parseFloat(iii.attr('data-longitude')), parseFloat(iii.attr('data-latitude'))],
        zoom: parseInt(iii.attr('data-zoom'))
      });
      $('#map_property_view_polygon > div').each(function() {
        MachineMaps.addMachineAreaPolygon(map, $(this), iii.attr('data-boundary-points'));
      });
      var marker = new mapboxgl.Marker().setLngLat([parseFloat(iii.attr('data-longitude')), parseFloat(iii.attr('data-latitude'))]).addTo(map);
    }

  }
  // typeof callback === 'function' && callback();
}

$(document).ready(function() {
  MachineMaps.set();
  MachineAreas.setMaps();
  MachineAddresses.setMaps();
  MachineProperties.setMaps();
});

/*
var MachineAddresses = {
  setBindings: function() {
    var initialized = false;
    if (!initialized) {
      MachineAddresses.setPropertViewMap();
      MachineAddresses.setPersonAddressMap();
      MachineAddresses.setCommunityPersonsMap();
      initialized = true;
    }
  },

  hasCommunityPersonsMap: function() {
    if (document.getElementById('map_persons_community')) { return true; } else { return false; }
  },
  setCommunityPersonsMap: function(callback) {
    if (MachineAddresses.hasCommunityPersonsMap())
    {
      var cmm = '/machine/addresses/municipality/tl.json';
      var iii = $('#map_persons_community');
      var map = L.mapbox.map('map_persons_community', 'ejw.map-knptko8g', $.extend({}, MachineMaps.defaults(), { minZoom: 8, maxZoom: 18 }));
          map.setView([parseFloat(iii.attr('data-latitude')), parseFloat(iii.attr('data-longitude'))], 12);
          map.invalidateSize();

      new L.Control.Zoom({ position: 'topright' }).addTo(map);
      new L.Marker(new L.LatLng(iii.attr('data-latitude'), iii.attr('data-longitude'))).addTo(map);
      // new L.mapbox.featureLayer(null, $.extend({ sanitizer: function(ss){ return(ss); } }, MachineMaps.accessToken())).loadURL(cmm).addTo(map);
    }
    typeof callback === 'function' && callback();
  }
}
*/

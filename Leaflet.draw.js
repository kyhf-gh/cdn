/**
 * Leaflet.draw assumes that you have already included the Leaflet library.
 */
L.drawVersion = '0.4.2';
/**
 * @class L.Draw
 * @aka Draw
 *
 *
 * To add the draw toolbar set the option drawControl: true in the map options.
 *
 * @example
 * ```js
 *      var map = L.map('map', {drawControl: true}).setView([51.505, -0.09], 13);
 *
 *      L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
 *          attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
 *      }).addTo(map);
 * ```
 *
 * ### Adding the edit toolbar
 * To use the edit toolbar you must initialise the Leaflet.draw control and manually add it to the map.
 *
 * ```js
 *      var map = L.map('map').setView([51.505, -0.09], 13);
 *
 *      L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
 *          attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
 *      }).addTo(map);
 *
 *      // FeatureGroup is to store editable layers
 *      var drawnItems = new L.FeatureGroup();
 *      map.addLayer(drawnItems);
 *
 *      var drawControl = new L.Control.Draw({
 *          edit: {
 *              featureGroup: drawnItems
 *          }
 *      });
 *      map.addControl(drawControl);
 * ```
 *
 * The key here is the featureGroup option. This tells the plugin which FeatureGroup contains the layers that
 * should be editable. The featureGroup can contain 0 or more features with geometry types Point, LineString, and Polygon.
 * Leaflet.draw does not work with multigeometry features such as MultiPoint, MultiLineString, MultiPolygon,
 * or GeometryCollection. If you need to add multigeometry features to the draw plugin, convert them to a
 * FeatureCollection of non-multigeometries (Points, LineStrings, or Polygons).
 */
L.Draw = {};

/**
 * @class L.drawLocal
 * @aka L.drawLocal
 *
 * The core toolbar class of the API — it is used to create the toolbar ui
 *
 * @example
 * ```js
 *      var modifiedDraw = L.drawLocal.extend({
 *          draw: {
 *              toolbar: {
 *                  buttons: {
 *                      polygon: 'Draw an awesome polygon'
 *                  }
 *              }
 *          }
 *      });
 * ```
 *
 * The default state for the control is the draw toolbar just below the zoom control.
 *  This will allow map users to draw vectors and markers.
 *  **Please note the edit toolbar is not enabled by default.**
 */
L.drawLocal = {
	// format: {
	// 	numeric: {
	// 		delimiters: {
	// 			thousands: ',',
	// 			decimal: '.'
	// 		}
	// 	}
	// },
	draw: {
		toolbar: {
			// #TODO: this should be reorganized where actions are nested in actions
			// ex: actions.undo  or actions.cancel
			actions: {
				title: '取消绘制',
				text: '取消'
			},
			finish: {
				title: '完成绘制',
				text: '完成'
			},
			undo: {
				title: '删除最后一点',
				text: '删除最后一点'
			},
			buttons: {
				polyline: '绘制折线',
				polygon: '绘制多变形',
				rectangle: '绘制矩形',
				circle: '绘制圆形',
				marker: '选择单点',
				circlemarker: 'Draw a circlemarker'
			}
		},
		handlers: {
			circle: {
				tooltip: {
					start: '点击地图并拖动绘制圆形'
				},
				radius: '半径'
			},
			circlemarker: {
				tooltip: {
					start: 'Click map to place circle marker.'
				}
			},
			marker: {
				tooltip: {
					start: '点击地图选择位置'
				}
			},
			polygon: {
				tooltip: {
					start: '点击地图选择多边形第一点',
					cont: '点击地图继续绘制多边形',
					end: '点击第一点闭合多边形'
				}
			},
			polyline: {
				error: '<strong>错误:</strong> 节点线段不能交叉',
				tooltip: {
					start: '点击地图开始绘制折线',
					cont: '点击地图继续绘制折线',
					end: '点击最后一点完成折线绘制'
				}
			},
			rectangle: {
				tooltip: {
					start: '点击地图开始绘制矩形'
				}
			},
			simpleshape: {
				tooltip: {
					end: '松开鼠标完成绘制'
				}
			}
		}
	},
	edit: {
		toolbar: {
			actions: {
				save: {
					title: '保存修改',
					text: '保存'
				},
				cancel: {
					title: '取消编辑，回退所有更改',
					text: '取消'
				},
				clearAll: {
					title: '删除所有图层',
					text: '清除所有'
				}
			},
			buttons: {
				edit: '编辑图层',
				editDisabled: '没有内容可删除',
				remove: '删除图层',
				removeDisabled: '没有图层可删除'
			}
		},
		handlers: {
			edit: {
				tooltip: {
					text: '拖动节点以编辑该图形',
					subtext: '点击取消撤销修改'
				}
			},
			remove: {
				tooltip: {
					text: '选择要删除的图形'
				}
			}
		}
	}
};

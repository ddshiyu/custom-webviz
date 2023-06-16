/* eslint-disable header/header */

//  Copyright (c) 2018-present, Cruise LLC
//
//  This source code is licensed under the Apache License, Version 2.0,
//  found in the LICENSE file in the root directory of this source tree.
//  You may not use this file except in compliance with the License.

import * as Sentry from "@sentry/browser";
import React from "react";
import ReactDOM from "react-dom";

const getEnableWhyDidYouRender = () => {
  try {
    return JSON.parse(process.env.ENABLE_WHY_DID_YOU_RENDER || "false");
  } catch {
    return false;
  }
};

if (process.env.NODE_ENV === "development" && getEnableWhyDidYouRender()) {
  const whyDidYouRender = require("@welldone-software/why-did-you-render");
  whyDidYouRender(React, {
    trackAllPureComponents: true,
  });
}

// We put all the internal requires inside functions, so that when they load the hooks have been properly set.

let importedPanelsByCategory;
let importedPerPanelHooks;
const defaultHooks = {
  areHooksImported: () => importedPanelsByCategory && importedPerPanelHooks,
  getLayoutFromUrl: async (search) => {
    const {
      LAYOUT_URL_QUERY_KEY
    } = require("webviz-core/src/util/globalConstants");
    const params = new URLSearchParams(search);
    const layoutUrl = params.get(LAYOUT_URL_QUERY_KEY);
    return fetch(layoutUrl)
      .then((result) => {
        try {
          return result.json();
        } catch (e) {
          throw new Error(`Failed to parse JSON layout: ${e.message}`);
        }
      })
      .catch((e) => {
        throw new Error(`Failed to fetch layout from URL: ${e.message}`);
      });
  },
  getDemoModeComponent: () => undefined,
  async importHooksAsync() {
    return new Promise((resolve, reject) => {
      if (importedPanelsByCategory && importedPerPanelHooks) {
        resolve();
      }
      import( /* webpackChunkName: "hooks_bundle" */ "./hooksImporter")
        .then((hooksImporter) => {
          importedPerPanelHooks = hooksImporter.perPanelHooks();
          importedPanelsByCategory = hooksImporter.panelsByCategory();
          resolve();
        })
        .catch((reason) => {
          Sentry.captureException(new Error(reason));
          reject(`Failed to import hooks bundle: ${reason}`);
        });
    });
  },
  getDefaultPersistedState() {
    const {
      defaultPlaybackConfig
    } = require("webviz-core/src/reducers/panels");
    /* eslint-disable no-restricted-modules */
    const {
      CURRENT_LAYOUT_VERSION
    } = require("webviz-core/migrations/constants");
    // All panel fields have to be present.
    return {
      fetchedLayout: {
        isLoading: false,
        data: undefined
      },
      search: "",
      panels: {
        "layout": {
          "direction": "row",
          "first": {
            "first": "RawMessages!262gex8",
            "second": "RawMessages!1sn1gx7",
            "direction": "column",
            "splitPercentage": 47.68104149715215
          },
          "second": {
            "direction": "row",
            "first": {
              "first": "RosOut!33xd63r",
              "second": "RawMessages!3vfolju",
              "direction": "column",
              "splitPercentage": 47.762408462164366
            },
            "second": {
              "direction": "row",
              "first": {
                "first": "Plot!9o41hi",
                "second": "RosOut!2dwmi3h",
                "direction": "column"
              },
              "second": "3D Panel!1t2cjaa",
              "splitPercentage": 28.985465837575276
            },
            "splitPercentage": 16.43238002908386
          },
          "splitPercentage": 19.4140625
        },
        "savedProps": {
          "RawMessages!262gex8": {
            "topicPath": "/minibus/polygon_objects",
            "diffTopicPath": "",
            "diffMethod": "previous message",
            "diffEnabled": true,
            "showFullMessageForDiff": true
          },
          "RawMessages!1sn1gx7": {
            "topicPath": "/minibus/lidar_moving_objects",
            "diffTopicPath": "",
            "diffMethod": "custom",
            "diffEnabled": false,
            "showFullMessageForDiff": false
          },
          "RosOut!33xd63r": {
            "searchTerms": [
              "/real_control"
            ],
            "minLogLevel": 2,
            "topicToRender": "/rosout_agg"
          },
          "RawMessages!3vfolju": {
            "topicPath": "/minibus/camera_moving_objects",
            "diffTopicPath": "",
            "diffMethod": "custom",
            "diffEnabled": false,
            "showFullMessageForDiff": false
          },
          "Plot!9o41hi": {
            "paths": [{
                "value": "/minibus/vehicle/info.SteeringAngle",
                "enabled": false,
                "timestampMethod": "receiveTime"
              },
              {
                "value": "/minibus/vehicle/info.YawRate",
                "enabled": false,
                "timestampMethod": "receiveTime"
              },
              {
                "value": "/minibus/planning_trajectory.Trajectory[15].x",
                "enabled": true,
                "timestampMethod": "receiveTime"
              }
            ],
            "minYValue": "",
            "maxYValue": "",
            "showLegend": true,
            "xAxisVal": "timestamp"
          },
          "RosOut!2dwmi3h": {
            "searchTerms": [
              "/mcu_udp_print"
            ],
            "minLogLevel": 2,
            "topicToRender": "/rosout"
          },
          "3D Panel!1t2cjaa": {
            "checkedKeys": [
              "name:Topics",
              "t:/minibus/left/lslidar_point_cloud",
              "t:/yjkj_vector_map/leftborder_marker",
              "t:/yjkj_vector_map/rightborder_marker",
              "t:/yjkj_vector_map/guidance_marker",
              "t:/yjkj_vector_map/jb_marker",
              "ns:/tf:base_link",
              "t:/minibus/fusion_velocity_marker",
              "t:/minibus/plan_result",
              "ns:/minibus/plan_result:decision_result",
              "ns:/minibus/plan_result:ego_car_marker",
              "ns:/minibus/plan_result:end_speed",
              "ns:/minibus/plan_result:plan_result",
              "t:/vehicle_pose",
              "t:/minibus/fusion_polygon_marker",
              "t:/minibus/realtime_cost_map",
              "t:/tf",
              "t:/minibus/fusion_bbox_marker",
              "ns:/metadata:height",
              "t:/points_concat"
            ],
            "expandedKeys": [
              "name:Topics",
              "t:/yjkj_vector_map/rightborder_marker",
              "t:/minibus/fusion_polygon_marker"
            ],
            "followTf": "base_link",
            "cameraState": {
              "distance": 24.388062189234365,
              "perspective": true,
              "phi": 1.1261187957689203,
              "targetOffset": [
                -5.114420646861779,
                -3.155893685828353,
                0
              ],
              "thetaOffset": -18.834277539885928,
              "fovy": 0.7853981633974483,
              "near": 0.01,
              "far": 5000
            },
            "modifiedNamespaceTopics": [
              "/tf",
              "/metadata",
              "/minibus/plan_result"
            ],
            "pinTopics": false,
            "settingsByKey": {
              "ns:/yjkj_vector_map/leftborder_marker:basic_shapes": {
                "overrideColor": {
                  "r": 0.1803921568627451,
                  "g": 0.19607843137254902,
                  "b": 0.5058823529411764,
                  "a": 1
                }
              },
              "ns:/yjkj_vector_map/rightborder_marker:basic_shapes": {
                "overrideColor": {
                  "r": 0.1803921568627451,
                  "g": 0.19607843137254902,
                  "b": 0.5058823529411764,
                  "a": 1
                }
              },
              "ns:/minibus/fusion_polygon_marker:/fusion_hull_markers": {
                "overrideColor": {
                  "r": 0.10980392156862745,
                  "g": 0.19215686274509805,
                  "b": 0.5882352941176471,
                  "a": 1
                }
              }
            },
            "autoSyncCameraState": false,
            "autoTextBackgroundColor": true,
            "topicDisplayMode": "SHOW_ALL",
            "searchText": ""
          }
        },
        "globalVariables": {},
        "userNodes": {},
        "linkedGlobalVariables": [],
        "playbackConfig": {
          "speed": 1,
          "messageOrder": "receiveTime",
          "timeDisplayMethod": "ROS"
        },
        "version": 19,
        "isFromUrl": false,
        "skipSettingLocalStorage": true,
        "fullScreenPanel": {
          "panelId": "Plot!ry117m",
          "locked": true
        }
      },
    };
  },
  migratePanels(panels) {
    const migratePanels = require("webviz-core/migrations").default;
    return migratePanels(panels);
  },
  panelCategories() {
    return [{
        label: "ROS",
        key: "ros"
      },
      {
        label: "Utilities",
        key: "utilities"
      },
      {
        label: "Debugging",
        key: "debugging"
      },
    ];
  },
  panelsByCategory: () => {
    if (!importedPanelsByCategory) {
      throw new Error("panelsByCategory requested before hooks have been imported");
    }
    return importedPanelsByCategory;
  },
  helpPageFootnote: () => null,
  perPanelHooks: () => {
    if (!importedPerPanelHooks) {
      throw new Error("perPanelHooks requested before hooks have been imported");
    }
    return importedPerPanelHooks;
  },
  startupPerPanelHooks: () => {
    return {
      ThreeDimensionalViz: {
        getDefaultTopicSettingsByColumn(_topicName) {
          return undefined;
        },
        getDefaultSettings: () => ({}),
        getDefaultTopicTree: () => ({
          name: "root",
          children: [{
            name: "TF",
            topicName: "/tf",
            children: [],
            description: "Visualize relationships between /tf frames."
          }, ],
        }),
        getStaticallyAvailableNamespacesByTopic: () => ({}),
      },
    };
  },
  Root({
    store
  }) {
    const Root = require("webviz-core/src/components/Root").default;
    return <Root store = {
      store
    }
    />;
  },
  load: async () => {
    if (process.env.NODE_ENV === "production" && window.ga) {
      window.ga("create", "UA-82819136-10", "auto");
    } else {
      window.ga = function (...args) {
        console.log("[debug] ga:", ...args);
      };
    }
    window.ga("send", "pageview");

    const {
      disableLogEvent
    } = require("webviz-core/src/util/logEvent");
    disableLogEvent();
  },
  getWorkerDataProviderWorker: () => {
    return require("webviz-core/src/dataProviders/WorkerDataProvider.worker");
  },
  getAdditionalDataProviders: () => {},
  getBasicDatatypes: () => require("webviz-core/src/util/datatypes").basicDatatypes,
  experimentalFeaturesList() {
    return {
      diskBagCaching: {
        name: "Disk Bag Caching (requires reload)",
        description: "When streaming bag data, persist it on disk, so that when reloading the page we don't have to download the data again. However, this might result in an overall slower experience, and is generally experimental, so we only recommend it if you're on a slow network connection. Alternatively, you can download the bag to disk manually, and drag it into Webviz.",
        developmentDefault: false,
        productionDefault: false,
      },
      unlimitedMemoryCache: {
        name: "Unlimited in-memory cache (requires reload)",
        description: "If you have a lot of memory in your computer, and you frequently have to play all the way through large bags, you can turn this on to fully buffer the bag into memory. However, use at your own risk, as this might crash the browser.",
        developmentDefault: false,
        productionDefault: false,
      },
      useGLChartIn2dPlot: {
        name: "Enable WebGL-based charts for the 2D plot panel",
        description: "Replaces the Chartjs-based charts with a new implementation using WebGL instead.",
        developmentDefault: false,
        productionDefault: false,
      },
      useGLChartInPlotPanel: {
        name: "Enable WebGL-based charts for the Plot panel",
        description: "Replaces the Chartjs-based charts with a new implementation using WebGL instead.",
        developmentDefault: false,
        productionDefault: false,
      },
    };
  },
  linkMessagePathSyntaxToHelpPage: () => true,
  getSecondSourceUrlParams() {
    const {
      REMOTE_BAG_URL_2_QUERY_KEY
    } = require("webviz-core/src/util/globalConstants");
    return [REMOTE_BAG_URL_2_QUERY_KEY];
  },
  updateUrlToTrackLayoutChanges: async ({
    _store,
    _skipPatch
  }) => {
    // Persist the layout state in URL or remote storage if needed.
    await Promise.resolve();
  },
};

let hooks = defaultHooks;

export function getGlobalHooks() {
  return hooks;
}

export function setHooks(hooksToSet) {
  hooks = {
    ...hooks,
    ...hooksToSet
  };
}

export function resetHooksToDefault() {
  hooks = defaultHooks;
}

export async function loadWebviz(hooksToSet) {
    if (hooksToSet) {
      setHooks(hooksToSet);
    }

    require("webviz-core/src/styles/global.scss");
    const Confirm = require("webviz-core/src/components/Confirm").default;
    const prepareForScreenshots = require("webviz-core/src/stories/prepareForScreenshots").default;
    const installDevtoolsFormatters = require("webviz-core/src/util/installDevtoolsFormatters").default;
    const overwriteFetch = require("webviz-core/src/util/overwriteFetch").default;
    const {
      clearIndexedDbWithoutConfirmation
    } = require("webviz-core/src/util/indexeddb/clearIndexedDb");
    const waitForFonts = require("webviz-core/src/styles/waitForFonts").default;

    prepareForScreenshots(); // For integration screenshot tests.
    installDevtoolsFormatters();
    overwriteFetch();
    window.clearIndexedDb = clearIndexedDbWithoutConfirmation; // For integration tests.

    // In production, hooks.load() will return initializationResult immediately.
    // In a performance measuring mode, we delay the load while the Polly library
    // loads so we can record and replay network requests before the app starts.
    const initializationResult = await hooks.load();

    async function render() {
      const rootEl = document.getElementById("root");
      if (!rootEl) {
        // appease flow
        throw new Error("missing #root element");
      }

      await waitForFonts();
      ReactDOM.render( < hooks.Root history = {
          history
        }
        initializationResult = {
          initializationResult
        }
        />, rootEl);
      }

      // Render a warning message if the user has an old browser.
      // From https://stackoverflow.com/a/4900484
      const chromeMatch = navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./);
      const chromeVersion = chromeMatch ? parseInt(chromeMatch[2], 10) : 0;
      if (chromeVersion < MINIMUM_CHROME_VERSION) {
        if (window.webviz_hideLoadingLogo) {
          window.webviz_hideLoadingLogo();
        }
        Confirm({
          title: "Update your browser",
          prompt: chromeVersion === 0 ?
            `You are not using Google Chrome. Please use Chrome ${MINIMUM_CHROME_VERSION} or later to continue.` :
            `Chrome ${chromeVersion} is not supported. Please use Chrome ${MINIMUM_CHROME_VERSION} or later to continue.`,
          confirmStyle: "primary",
          ok: chromeVersion === 0 ? "Download Chrome" : "Update Chrome",
          cancel: "Continue anyway",
        }).then((ok) => {
          if (ok) {
            window.location = "https://www.google.com/chrome/";
          } else {
            render();
          }
        });
      } else {
        render();
      }
    }

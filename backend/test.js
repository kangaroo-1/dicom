import {
    init as coreInit,
    RenderingEngine,
    Enums,
    volumeLoader,
    setVolumesForViewports,
  } from '@cornerstonejs/core';
  import { init as dicomImageLoaderInit } from '@cornerstonejs/dicom-image-loader';
  import { createImageIdsAndCacheMetaData } from '../../../../utils/demo/helpers';
  
  const { ViewportType } = Enums;
  
  const content = document.getElementById('content');
  
  const viewportGrid = document.createElement('div');
  viewportGrid.style.display = 'flex';
  viewportGrid.style.flexDirection = 'row';
  
  // element for axial view
  const element1 = document.createElement('div');
  element1.style.width = '500px';
  element1.style.height = '500px';
  
  // element for sagittal view
  const element2 = document.createElement('div');
  element2.style.width = '500px';
  element2.style.height = '500px';
  
  viewportGrid.appendChild(element1);
  viewportGrid.appendChild(element2);
  
  content.appendChild(viewportGrid);
  // ============================= //
  
  async function run() {
    await coreInit();
    await dicomImageLoaderInit();
  
    // Get Cornerstone imageIds and fetch metadata into RAM
    const imageIds = await createImageIdsAndCacheMetaData({
      StudyInstanceUID:
        '1.3.6.1.4.1.14519.5.2.1.7009.2403.334240657131972136850343327463',
      SeriesInstanceUID:
        '1.3.6.1.4.1.14519.5.2.1.7009.2403.226151125820845824875394858561',
      wadoRsRoot: 'https://d14fa38qiwhyfd.cloudfront.net/dicomweb',
    });
  
    // Instantiate a rendering engine
    const renderingEngineId = 'myRenderingEngine';
    const renderingEngine = new RenderingEngine(renderingEngineId);
  
    const volumeId = 'myVolume';
  
    // Define a volume in memory
    const volume = await volumeLoader.createAndCacheVolume(volumeId, {
      imageIds,
    });
  
    const viewportId1 = 'CT_AXIAL';
    const viewportId2 = 'CT_SAGITTAL';
  
    const viewportInput = [
      {
        viewportId: viewportId1,
        element: element1,
        type: ViewportType.ORTHOGRAPHIC,
        defaultOptions: {
          orientation: Enums.OrientationAxis.AXIAL,
        },
      },
      {
        viewportId: viewportId2,
        element: element2,
        type: ViewportType.ORTHOGRAPHIC,
        defaultOptions: {
          orientation: Enums.OrientationAxis.SAGITTAL,
        },
      },
    ];
  
    renderingEngine.setViewports(viewportInput);
  
    volume.load();
  
    setVolumesForViewports(
      renderingEngine,
      [{ volumeId }],
      [viewportId1, viewportId2]
    );
  }
  
  run();
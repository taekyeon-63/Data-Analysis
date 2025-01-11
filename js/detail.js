window.addEventListener('DOMContentLoaded', (event) => {
    // 기존 기능: 사이드바 토글
    const sidebarToggle = document.body.querySelector('#sidebarToggle');
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', (event) => {
            event.preventDefault();
            document.body.classList.toggle('sb-sidenav-toggled');
            localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
        });
    }

    // PDF.js 관련 기능
    const pdfContainers = document.querySelectorAll('.pdf-viewer-container');

    pdfContainers.forEach((pdfContainer) => {
        // PDF 컨테이너 기본 스타일 적용
        pdfContainer.style.position = 'relative';
        pdfContainer.style.display = 'flex';
        pdfContainer.style.flexDirection = 'column';
        pdfContainer.style.alignItems = 'center';
        pdfContainer.style.width = '100%';

        const pdfControls = pdfContainer.querySelector('.pdf-controls');
        pdfControls.style.width = '100%'; // 컨트롤 영역의 폭을 PDF 영역에 맞춤
        pdfControls.style.textAlign = 'center';
        pdfControls.style.marginBottom = '10px';

        const pdfScrollArea = pdfContainer.querySelector('.pdf-scroll-area');
        pdfScrollArea.style.flex = '1'; // PDF 콘텐츠가 영역을 채우도록 설정
        pdfScrollArea.style.display = 'flex';
        pdfScrollArea.style.justifyContent = 'center';
        pdfScrollArea.style.alignItems = 'center';
        pdfScrollArea.style.width = '100%';

        const canvas = pdfContainer.querySelector('canvas');
        canvas.style.display = 'block';

        const url = pdfContainer.getAttribute('data-pdf-url');
        if (!url) {
            console.error('PDF URL not specified in the container:', pdfContainer);
            return;
        }

        pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.14.305/pdf.worker.min.js';

        let pdfDoc = null, pageNum = 1;

        const ctx = canvas.getContext('2d');
        const pageNumElement = pdfContainer.querySelector('.pageNum');
        const pageCountElement = pdfContainer.querySelector('.pageCount');
        const prevButton = pdfContainer.querySelector('.prevPage');
        const nextButton = pdfContainer.querySelector('.nextPage');

        const renderPage = (num) => {
            pdfDoc.getPage(num).then((page) => {
                const viewport = page.getViewport({ scale: 1.3 });
                canvas.height = viewport.height;
                canvas.width = viewport.width;

                const renderCtx = {
                    canvasContext: ctx,
                    viewport: viewport,
                };

                page.render(renderCtx);
                pageNumElement.textContent = num;

                // PDF 컨테이너의 크기를 동적으로 설정
                pdfContainer.style.height = `${canvas.height + pdfControls.offsetHeight}px`;
            }).catch((error) => {
                console.error('Error rendering page:', error);
            });
        };

        pdfjsLib.getDocument(url).promise.then((pdfDoc_) => {
            pdfDoc = pdfDoc_;
            pageCountElement.textContent = pdfDoc.numPages;
            renderPage(pageNum);
        }).catch((error) => {
            console.error('Error loading PDF:', error);
        });

        prevButton.addEventListener('click', () => {
            if (pageNum <= 1) return;
            pageNum--;
            renderPage(pageNum);
        });

        nextButton.addEventListener('click', () => {
            if (pageNum >= pdfDoc.numPages) return;
            pageNum++;
            renderPage(pageNum);
        });
    });
});

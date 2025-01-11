Chart.register({
    id: 'hoverSync',
    beforeEvent(chart, args) {
        const event = args.event;
        if (event.type === 'mousemove') {
            const activeIndex = chart.getActiveElements()[0]?.index; // 현재 차트의 활성화된 데이터 인덱스
            if (activeIndex === undefined) return;

            const chartLabels = chart.data.labels;
            const activeLabel = chartLabels[activeIndex]; // 활성화된 항목의 라벨

            const chartInstances = Chart.instances;
            Object.values(chartInstances).forEach((otherChart) => {
                if (otherChart === chart) return; // 현재 차트는 제외

                const otherLabels = otherChart.data.labels;
                const otherIndex = otherLabels.indexOf(activeLabel); // 다른 차트에서의 동일 라벨 인덱스

                if (otherIndex !== -1) {
                    // 동일한 항목이 있을 경우 동기화
                    const elements = [
                        { datasetIndex: 0, index: otherIndex },
                    ];
                    otherChart.setActiveElements(elements);
                    otherChart.tooltip.setActiveElements(elements, event);
                } else {
                    // 동일 항목이 없으면 비활성화
                    otherChart.setActiveElements([]);
                    otherChart.tooltip.setActiveElements([], event);
                }
                otherChart.update();
            });
        }
    },
    afterEvent(chart) {
        const chartInstances = Chart.instances;
        Object.values(chartInstances).forEach((otherChart) => {
            if (otherChart === chart) return;
            otherChart.update(); // 호버 동기화 후 업데이트
        });
    },
});

import React, { useRef, useEffect } from 'react';
import * as Plot from '@observablehq/plot';

function Chart({ array, max, x, y }) {
    const plotRef = useRef(null);

    useEffect(() => {
        // Ваши данные
        const data = [
            { x: 1, y: 10 },
            { x: 2, y: 8 },
            { x: 3, y: 7 },
            { x: 4, y: 5 },
            { x: 5, y: 8 }
        ];

        const formattedData = array.map((el, index) => ({ x: index + 1, y: el.result }))

        // Создаем график
        const chart = Plot.plot({
            x: {
                label: x
            },
            y: {
                label: y,
                domain: [0, max]  // Максимальное значение Y задается здесь
            },
            marks: [
                Plot.line(formattedData, { x: "x", y: "y", curve: "catmull-rom" }),  // Линия, проходящая через все точки
                Plot.dot(formattedData, { x: "x", y: "y" })  // Точки на каждом значении данных
            ]
        });

        // Добавляем созданный график в DOM
        plotRef.current.appendChild(chart);

        return () => {
            // Очищаем при размонтировании
            if (plotRef.current && chart) {
                plotRef.current.removeChild(chart);
            }
        };
    }, [array]);

    return <div ref={plotRef}></div>;
}

export default Chart;
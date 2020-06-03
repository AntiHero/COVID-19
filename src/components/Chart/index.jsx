import React, { useEffect, useState } from "react";
import { fetchDailyData } from "../../api";
import { Backdrop, CircularProgress } from "@material-ui/core";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4themes_kelly from "@amcharts/amcharts4/themes/kelly";

import styles from "./Chart.module.scss";

const Chart = () => {
  const [dailyData, setDailyData] = useState([]);

  useEffect(() => {
    async function getDailyData() {
      const response = await fetchDailyData();
      setDailyData(response);
    }

    getDailyData();
  }, []);

  useEffect(() => {
    if (dailyData.length) {
      am4core.useTheme(am4themes_animated);
      am4core.useTheme(am4themes_kelly);

      // Create chart instance
      const chart = am4core.create("chartdiv_xy", am4charts.XYChart);

      const title = chart.titles.create();
      title.text = "Global cases";
      title.fontSize = 25;
      title.fontWeight = 600;
      title.marginTop = 100;

      // Add data
      const data = dailyData.map((dataChunk) => ({
        date: dataChunk.reportDate,
        deaths: dataChunk.deaths.total,
        confirmed: dataChunk.confirmed.total,
      }));

      const interfaceColors = new am4core.InterfaceColorSet();

      chart.data = data;

      chart.leftAxesContainer.layout = "vertical";

      // uncomment this line if you want to change order of axes
      //chart.bottomAxesContainer.reverseOrder = true;

      const dateAxis = chart.xAxes.push(new am4charts.DateAxis());
      dateAxis.renderer.grid.template.location = 0;
      dateAxis.renderer.ticks.template.length = 8;
      dateAxis.renderer.ticks.template.strokeOpacity = 0.1;
      //dateAxis.renderer.grid.template.disabled = true;
      dateAxis.renderer.ticks.template.disabled = false;
      dateAxis.renderer.ticks.template.strokeOpacity = 0.2;

      chart.leftAxesContainer.pixelPerfect = true;
      dateAxis.pixelPerfect = true;
      dateAxis.renderer.pixelPerfect = true;
      dateAxis.renderer.gridContainer.layout = "absolute";

      // these two lines makes the axis to be initially zoomed-in
      dateAxis.start = 0.9;
      dateAxis.keepSelection = true;

      const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.tooltip.disabled = true;
      valueAxis.zIndex = 1;
      valueAxis.renderer.baseGrid.disabled = true;
      // height of axis
      valueAxis.height = am4core.percent(60);
      valueAxis.renderer.inside = true;
      valueAxis.renderer.labels.template.verticalCenter = "bottom";
      valueAxis.renderer.labels.template.padding(2, 2, 2, 2);
      //valueAxis.renderer.maxLabelPosition = 0.95;
      valueAxis.renderer.fontSize = "0.8em";

      // uncomment these lines to fill plot area of this axis with some color
      valueAxis.renderer.gridContainer.background.fill = interfaceColors.getFor(
        "alternativeBackground"
      );
      valueAxis.renderer.gridContainer.background.fillOpacity = 0.01;

      const series = chart.series.push(new am4charts.LineSeries());
      series.dataFields.dateX = "date";
      series.dataFields.valueY = "confirmed";
      series.tooltipText = "{name}: [bold]{valueY}[/]";
      series.name = "Confirmed";

      const valueAxis2 = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis2.tooltip.disabled = true;

      // height of axis
      valueAxis2.height = am4core.percent(40);
      valueAxis2.zIndex = 3;
      // this makes gap between panels
      valueAxis2.marginTop = 30;
      valueAxis2.renderer.baseGrid.disabled = true;
      valueAxis2.renderer.inside = true;
      valueAxis2.renderer.labels.template.verticalCenter = "bottom";
      valueAxis2.renderer.labels.template.padding(2, 2, 2, 2);
      //valueAxis2.renderer.maxLabelPosition = 0.95;
      valueAxis2.renderer.fontSize = "0.8em";

      // uncomment these lines to fill plot area of this axis with some color
      valueAxis2.renderer.gridContainer.background.fill = interfaceColors.getFor(
        "alternativeBackground"
      );
      valueAxis2.renderer.gridContainer.background.fillOpacity = 0.01;

      const series2 = chart.series.push(new am4charts.ColumnSeries());
      series2.columns.template.width = am4core.percent(50);
      series2.columns.template.fill = am4core.color("#c42e2e");
      series2.dataFields.dateX = "date";
      series2.dataFields.valueY = "deaths";
      series2.yAxis = valueAxis2;
      series2.tooltipText = "{name}: [bold]{valueY}[/]";
      series2.name = "Deaths";

      chart.cursor = new am4charts.XYCursor();
      chart.cursor.xAxis = dateAxis;

      const scrollbarX = new am4charts.XYChartScrollbar();
      scrollbarX.series.push(series);
      scrollbarX.marginBottom = 20;
      chart.scrollbarX = scrollbarX;

      let rectangle = chart.plotContainer.createChild(am4core.Rectangle);
      rectangle.fillOpacity = 1;
      rectangle.width = am4core.percent(100);
      rectangle.fill = am4core.color("#ffffff");
      rectangle.isMeasured = false;
      rectangle.height = 29;
      rectangle.zIndex = 1000;

      valueAxis2.events.on("positionchanged", function () {
        rectangle.y = valueAxis2.pixelY - rectangle.pixelHeight - 1;
      });

      // Add cursor
      chart.cursor = new am4charts.XYCursor();
    }
  }, [dailyData]);

  if (!dailyData.length) {
    return (
      <Backdrop open={true}>
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }

  return (
    <div className={styles.container}>
      <div
        id="chartdiv_xy"
        className="chart"
        style={{ width: "100%", height: "900px" }}
      ></div>
    </div>
  );
};

export default Chart;

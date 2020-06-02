import React, { useContext, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Backdrop,
  CircularProgress,
} from "@material-ui/core";
import styles from "./Cards.module.scss";
import CovidContext from "../../context";
import CountUp from "react-countup";
import cx from "classnames";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

const humanPath = "m62.096 8.5859c-5.208 0-9.424 4.2191-9.424 9.4261 0.001 5.203 4.217 9.424 9.424 9.424 5.202 0 9.422-4.221 9.422-9.424 0-5.208-4.22-9.4261-9.422-9.4261zm-10.41 21.268c-6.672 0-12.131 5.407-12.131 12.07v29.23c0 2.275 1.791 4.123 4.07 4.123 2.28 0 4.127-1.846 4.127-4.123v-26.355h2.102s0.048 68.811 0.048 73.331c0 3.05 2.478 5.53 5.532 5.53 3.052 0 5.525-2.48 5.525-5.53v-42.581h2.27v42.581c0 3.05 2.473 5.53 5.531 5.53 3.054 0 5.549-2.48 5.549-5.53v-73.331h2.127v26.355c0 2.275 1.85 4.123 4.126 4.123 2.28 0 4.073-1.846 4.073-4.123v-29.23c0-6.663-5.463-12.07-12.129-12.07h-20.82z";

const Cards = () => {
  const context = useContext(CovidContext);

  useEffect(() => {

    if (Object.keys(context).length) {
      const { confirmed, recovered, deaths } = context;

      const chart = am4core.create("chartdiv", am4charts.SlicedChart);
      chart.paddingTop = am4core.percent(10);
      chart.paddingBottom = am4core.percent(10);
  
      chart.data = [
        {
          name: "Infected",
          value: confirmed.value,
          color: am4core.color("#57c1ff"),
        },
        {
          name: "Recovered",
          value: recovered.value,
          color: am4core.color("#7eff57"),
        },
        {
          name: "Deaths",
          value: deaths.value,
          color: am4core.color("#ff5050"),
        },
      ];
  
      const series = chart.series.push(new am4charts.PictorialStackedSeries());
      series.dataFields.value = "value";
      series.dataFields.category = "name";
      series.startLocation = 0.0;
      series.endLocation = 1.0;
  
      series.slicesContainer.background.fill = am4core.color("#676767");
      series.slicesContainer.background.fillOpacity = 0.2;
  
      series.maskSprite.path = humanPath;
  
      series.labelsContainer.width = am4core.percent(100);
      series.alignLabels = true;
      series.slices.template.propertyFields.fill = "color";
      series.slices.template.propertyFields.stroke = "color";
  
      const gradientModifier = new am4core.LinearGradientModifier();
      gradientModifier.lightnesses = [0.3, -0.1];
      series.slices.template.fillModifier = gradientModifier;
      series.slices.template.strokeModifier = gradientModifier;
  
      // this makes the fills to start and end at certain location instead of taking whole picture
      series.endLocation = 1;
      series.startLocation = 0;
      // this makes initial fill animation
      series.hiddenState.properties.startLocation = 0.553;
      series.ticks.template.locationX = 0.7;
      series.labelsContainer.width = 120;
    }
  }, [context]);

  if (Object.keys(context).length === 0 && context.constructor === Object) {
    return (
      <Backdrop open={true}>
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }

  const { confirmed, recovered, deaths } = context;

  return (
    <div className={styles.container}>
      <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>
      {/* <Grid container spacing={3} justify="center">
        <Grid
          item
          component={Card}
          xs={12}
          md={3}
          className={cx(styles.card, styles.infected)}
        >
          <CardContent>
            <Typography variant="h6" color="textSecondary" gutterBottom>
              Infected
            </Typography>
            <Typography variant="h5">
              <CountUp
                start={0}
                end={confirmed.value}
                duration={2}
                separator="."
              />
            </Typography>
          </CardContent>
        </Grid>
        <Grid
          item
          component={Card}
          xs={12}
          md={3}
          className={cx(styles.card, styles.recovered)}
        >
          <CardContent>
            <Typography variant="h6" color="textSecondary" gutterBottom>
              Recovered
            </Typography>
            <Typography variant="h5">
              <CountUp
                start={0}
                end={recovered.value}
                duration={2}
                separator="."
              />
            </Typography>
          </CardContent>
        </Grid>
        <Grid
          item
          component={Card}
          xs={12}
          md={3}
          className={cx(styles.card, styles.dead)}
        >
          <CardContent>
            <Typography variant="h6" color="textSecondary" gutterBottom>
              Deaths
            </Typography>
            <Typography variant="h5">
              <CountUp
                start={0}
                end={deaths.value}
                duration={2}
                separator="."
              />
            </Typography>
          </CardContent>
        </Grid>
      </Grid> */}
    </div>
  );
};

export default Cards;

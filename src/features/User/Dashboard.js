import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userSelector, fetchData, clearState } from "./UserSlice";
import { useHistory } from "react-router-dom";
import Card from "@mui/material/Card";
import ReactHighcharts from "react-highcharts";
import { Button, Col, Row } from "react-bootstrap";
import moment from "moment";
import { kFormatter } from "../../helpers/Utils";

const Dashboard = () => {
  const history = useHistory();

  const dispatch = useDispatch();

  var pageviews = [];
  var publishedCount = [];
  var timestamp = [];
  const { isFetching, isError } = useSelector(userSelector);
  useEffect(() => {
    dispatch(fetchData({ token: localStorage.getItem("token") }));
  }, []);
  const { data } = useSelector((state) => state.user);

  data &&
    data.map((dt) => {
      pageviews.push(kFormatter(dt.pageviews));
      publishedCount.push(dt.published_count);
      timestamp.push(moment(dt.timestamp).format("YY.MMM"));
    });

  const noPureConfig = {
    chart: {
      backgroundColor: {
        linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },
        stops: [
          [0, "#33334E"],
          [1, "#1D1D2E"],
        ],
      },
      plotBorderColor: "#606063",
      zoomType: "xy",
    },
    title: {
      text: "Pageviews over Time",
      align: "left",
      style: {
        color: "white",
      },
    },
    xAxis: [
      {
        categories: timestamp,
        crosshair: true,
      },
      {
        categories: timestamp,
        crosshair: true,
        visible: false,
      },
    ],
    yAxis: [
      {
        // Primary yAxis
        labels: {
          format: "{value}",
          style: {
            color: "white",
          },
        },
        title: {
          text: "Published Articles",
          style: {
            color: "white",
          },
        },
        opposite: true,
      },
      {
        // Secondary yAxis
        title: {
          text: "Pageviews",
          style: {
            color: "white",
          },
        },
        labels: {
          format: "{value} K",
          style: {
            color: "white",
          },
        },
      },
    ],
    tooltip: {
      shared: false,
    },
    legend: {
      color: "white",
    },
    series: [
      {
        name: "Pageviews",
        type: "spline",
        lineWidth: 6,
        states: {
          hover: {
            lineWidth: 8,
          },
        },
        marker: {
          enabled: false,
        },
        xAxis: 1,
        yAxis: 1,
        color: "#C67666",
        data: pageviews,
        tooltip: {
          valueSuffix: " K",
        },
      },
      {
        name: "Published Articles",
        type: "line",
        color: "#49B4EA",
        data: publishedCount,
        dataLabels: {
          enabled: true,
        },
        tooltip: {
          valueSuffix: "",
        },
        dashStyle: "dash",
      },
    ],
  };
  useEffect(() => {
    if (isError) {
      dispatch(clearState());
      history.push("/login");
    }
  }, [isError]);

  const onLogOut = () => {
    localStorage.removeItem("token");

    history.push("/login");
  };
  return (
    <div className="container mx-auto">
      <Row className="mt-4" style={{ justifyContent: "end" }}>
        <Col className="text-end mb-4" xl={2}>
          <Button variant="danger" onClick={onLogOut}>
            Log Out
          </Button>
        </Col>
      </Row>
      <Row>
        <Card style={{ backgroundColor: "#33334E" }}>
          <ReactHighcharts config={noPureConfig} />
        </Card>
      </Row>
    </div>
  );
};

export default Dashboard;

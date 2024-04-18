import React, {useState} from "react";
import {Chart, LineAdvance, Tooltip} from "bizcharts";
import {useDebounceEffect, useSafeState} from "ahooks";
import {LoadingComponent, STATUS} from "../LoadingAndRetry/Loading";
import {fetchCollect} from "../../libs/request/sensor";
import dayjs from "dayjs";
import {Empty} from "antd";

const format = "YYYY-MM-DD HH:mm:ss";
const Line = (props) => {
  const [dataSource, setDataSource] = useSafeState([]);
  const [draw, setDraw] = useState(false);
  const fetchData = async function(sensorType, deviceId=undefined) {
    const res = await fetchCollect({
      start: dayjs(props.filter.start).format(format),
      end: dayjs(props.filter.end).format(format),
      deviceManageId: deviceId
    });
    setDataSource(res?.map?.((it=[])=>{
      return {
        ...it,
        _name: (sensorType?.find(((item)=> item.sensorType === it.sensorType)))?.webView,
        analysisValue: Number(it.analysisValue)
      };

    }));
  };

  useDebounceEffect(()=>{
    setDraw(false);
  }, [props.size], {leading: false, wait: 200});
  useDebounceEffect(()=>{
    if (draw===false) {
      setDraw(true);
    }
  }, [draw], {leading: false, wait: 200});
  useDebounceEffect(()=>{
    if (props.dataSource) {
      setDataSource(props.dataSource.map((it)=> {
        return {
          ...it,
          analysisValue: Number(it.analysisValue)
        };
      }));
    }
  }, [props.dataSource], {wait: 200});

  useDebounceEffect(()=>{
    if (props.deviceId) {
      fetchData(props.sensorTypeList, props.deviceId);
    }
  }, [props.deviceId, props.filter, props.sensorTypeList], {wait: 220});

  return ( <LoadingComponent state={draw? STATUS.SUCCESS:STATUS.LOADING}><div className="screen-box-container">
    {draw && dataSource.length>0 && <Chart autoFit data={dataSource}>
      <LineAdvance
        shape="circle"
        point
        position="createTime*analysisValue"
        color="_name"
        label={"单位：mm"}
      >
      </LineAdvance>
      <Tooltip>
        {
          (title, items) => {
            const item = items?.[0];
            if (!item) return <>无</>;
            return <div>
              <p>{item?.data?.createTime}</p>
              <p><span className={"base-color-sensor"}>{item?.data?._name}</span> ：<span className={"base-color-exc"}>{item?.value} {item?.data?.unit}</span></p>
            </div>;
          }
        }
      </Tooltip>
    </Chart> }
    {dataSource.length<=0 && <Empty description={"没有数据"} style={{marginTop: 40}} />}
  </div>
  </LoadingComponent>
  );
};
export default Line;



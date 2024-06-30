import { useEffect, useContext } from "react";
import Graph from "graphology";
import { SigmaContainer, useLoadGraph } from "@react-sigma/core";
import "@react-sigma/core/lib/react-sigma.min.css";
import { useQuery } from '@apollo/client'
import { QUERY as FIND_ENTITIES_QUERY } from '@/components/Entity/EntitiesCell/EntitiesCell'

const sigmaStyle = {
  height: "100%",
  width: "100%",
  backgroundColor: "white",
};

const nodeProperties = {
  size: 10,
  color: "blue",
  font: { color: "white" },
};

const edgeProperties = {
  size: 2,
  color: "white",
};

// Component that load the graph
export const LoadGraph = (data) => {
  const loadGraph = useLoadGraph();

  useEffect(() => {
    const graph = new Graph();

    Object.keys(data.data.entities).forEach((key) => {
      graph.addNode(data.data.entities[key].id, {
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: nodeProperties.size,
        label: data.data.entities[key].firstName + " " + data.data.entities[key].lastName,
        color: nodeProperties.color,
        font: { color: "#FFFFFF" }
      });
    })



    // graph.addEdge(1, 2, { size: edgeProperties.size, color: edgeProperties.color });

    loadGraph(graph);
  }, [loadGraph]);

  return null;
};

// Component that display the graph
export const GraphVisualizer = () => {

  const { loading, error, data } = useQuery(FIND_ENTITIES_QUERY)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  return (
    <SigmaContainer className="col-span-3" style={sigmaStyle} >
      <LoadGraph data={data} />
    </SigmaContainer>
  );
};
import { useContext, useEffect, useState } from "react";
import Graph from "graphology";
import { SigmaContainer, useLoadGraph, useSigma } from "@react-sigma/core";
import "@react-sigma/core/lib/react-sigma.min.css";
import { useQuery } from '@apollo/client'
import { QUERY as FIND_ENTITIES_QUERY } from '@/components/Entity/EntitiesCell/EntitiesCell'
import { QUERY as FIND_RELATIONSHIPS_QUERY } from '@/components/Relationship/RelationshipsCell/RelationshipsCell'
import sigmaStyle from "@/config/SigmaContainer.config";
import sigmaSettings from "@/config/SigmaSettings.config";
import nodeProperties from "@/config/NodeProperties.config";
import edgeProperties from "@/config/EdgeProperties.config";
import edgesColors from "@/config/EdgeColor.config";
import NodeProperties from "./NodeProperties/NodeProperties";
import { SelectedNodeContext } from "@/context/SelectedNodeContext";
import { FindEntities, FindRelationships } from "types/graphql";

const GraphEventHandler = () => {
  const sigma = useSigma();
  const { selectedNode, setSelectedNode } = useContext(SelectedNodeContext);

  useEffect(() => {
    const handleOverNode = (event) => {
      const node = event.node;
      const nodeAttributes = sigma.getGraph().getNodeAttributes(node);
      setSelectedNode({id: parseInt(node), attr: nodeAttributes});
    };

    sigma.on("enterNode", handleOverNode);

    return () => {
      sigma.off("enterNode", handleOverNode);
    };
  }, [sigma]);

  useEffect(() => {
    const handleOutNode = () => {
      setSelectedNode(null);
    };

    sigma.on("leaveNode", handleOutNode);

    return () => {
      sigma.off("leaveNode", handleOutNode);
    };
  })

  return null; // This component does not render anything itself
};

export const LoadGraph = (
  {
    nodes,
    edges
  }:{
    nodes: FindEntities,
    edges: FindRelationships
  }
) => {
  const loadGraph = useLoadGraph();

  useEffect(() => {
    const graph = new Graph();

    Object.values(nodes.entities).forEach((entity) => {
      graph.addNode(entity.id, {
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: nodeProperties.size,
        label: `${entity.firstName} ${entity.lastName.toUpperCase()}`,
        color: nodeProperties.color,
      });
    });

    Object.values(edges.relationships).forEach((relationship) => {

      graph.addEdge(relationship.entityOneId, relationship.entityTwoId, {
        size: edgeProperties.size,
        color: edgesColors[relationship.typeRelationshipId],
      });
    });

    loadGraph(graph);
  }, [loadGraph, nodes.entities, edges.relationships]);

  return null;
};

export const GraphVisualizer = () => {
  const { selectedNode } = useContext(SelectedNodeContext);
  const { loading: loadingEntities, error: errorEntities, data: dataEntities } = useQuery(FIND_ENTITIES_QUERY);
  const { loading: loadingRelationships, error: errorRelationships, data: dataRelationships } = useQuery(FIND_RELATIONSHIPS_QUERY);

  if (loadingEntities || loadingRelationships) return <p>Loading...</p>;
  if (errorEntities) return <p>Error: {errorEntities.message}</p>;
  if (errorRelationships) return <p>Error: {errorRelationships.message}</p>;

  return (
    <SigmaContainer
      className="col-span-3 relative"
      style={sigmaStyle}
      settings={sigmaSettings}
    >
      <NodeProperties node={selectedNode} />
      <LoadGraph
        nodes={dataEntities}
        edges={dataRelationships}
      />
      <GraphEventHandler />
    </SigmaContainer>
  );
};
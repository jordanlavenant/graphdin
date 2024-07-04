import { useContext, useEffect, useState } from "react";
import Graph, { MultiGraph, MultiUndirectedGraph } from "graphology";
import { SigmaContainer, useLoadGraph, useSigma } from "@react-sigma/core";
import "@react-sigma/core/lib/react-sigma.min.css";
import { useQuery } from '@apollo/client'
import { QUERY as FIND_ENTITIES_QUERY } from '@/components/Entity/EntitiesCell/EntitiesCell'
import { QUERY as FIND_RELATIONSHIPS_QUERY } from '@/components/Relationship/RelationshipsCell/RelationshipsCell'
import { QUERY as FIND_TYPE_RELATIONSHIPS_QUERY } from '@/components/TypeRelationship/TypeRelationshipsCell/TypeRelationshipsCell'
import sigmaStyle from "@/config/SigmaContainer.config";
import sigmaSettings from "@/config/SigmaSettings.config";
import nodeProperties from "@/config/NodeProperties.config";
import edgeProperties from "@/config/EdgeProperties.config";
import NodeProperties from "./NodeProperties/NodeProperties";
import { SelectedNodeContext } from "@/context/SelectedNodeContext";
import { FindEntities, FindRelationships, FindTypeRelationships } from "types/graphql";

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

  return null;
};

export const LoadGraph = (
  {
    entities: nodes,
    relationships: edges,
    typeRelationships: typeEdges
  }:{
    entities: FindEntities,
    relationships: FindRelationships,
    typeRelationships: FindTypeRelationships
  }
) => {
  const loadGraph = useLoadGraph();

  const getEntity = (id: number) => {
    return nodes.entities.find((entity) => entity.id === id);
  }

  const getTypeRelationship = (id: number) => {
    return typeEdges.typeRelationships.find((typeRelationship) => typeRelationship.id === id);
  }

  useEffect(() => {
    const graph = new MultiGraph();
    console.log(graph.multi, graph.type)

    console.log(graph.multi, graph.type)

    nodes.entities.forEach((entity) => {
      if (entity.visible) {
        graph.addNode(entity.id, {
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: nodeProperties.size,
          label: `${entity.firstName} ${entity.lastName.toUpperCase()}`,
          color: nodeProperties.color
        });
      }
    });

    edges.relationships.forEach((relationship, index) => {
      if (getEntity(relationship.entityOneId).visible && getEntity(relationship.entityTwoId).visible) {
        graph.addEdgeWithKey(
          index,
          relationship.entityTwoId,
          relationship.entityOneId,
          {
            size: edgeProperties.size,
            color: getTypeRelationship(relationship.typeRelationshipId).color,
          }
        );
      }
    });

    loadGraph(graph);
  }, [loadGraph, nodes.entities, edges.relationships, typeEdges.typeRelationships]);

  return null;
};

export const GraphVisualizer = () => {
  const { selectedNode } = useContext(SelectedNodeContext);
  const { loading: loadingEntities, error: errorEntities, data: dataEntities } = useQuery(FIND_ENTITIES_QUERY);
  const { loading: loadingRelationships, error: errorRelationships, data: dataRelationships } = useQuery(FIND_RELATIONSHIPS_QUERY);
  const { loading: loadingTypeRelationships, error: errorTypeRelationships, data: dataTypeRelationships } = useQuery(FIND_TYPE_RELATIONSHIPS_QUERY);

  if (loadingEntities || loadingRelationships || loadingTypeRelationships) return <p>Loading...</p>;
  if (errorEntities) return <p>Error: {errorEntities.message}</p>;
  if (errorRelationships) return <p>Error: {errorRelationships.message}</p>;
  if (errorTypeRelationships) return <p>Error: {errorTypeRelationships.message}</p>;

  return (
    <SigmaContainer
      className="col-span-3 relative"
      style={sigmaStyle}
      settings={sigmaSettings}
    >
      <NodeProperties node={selectedNode} />
      <LoadGraph
        entities={dataEntities}
        relationships={dataRelationships}
        typeRelationships={dataTypeRelationships}
      />
      <GraphEventHandler />
    </SigmaContainer>
  );
};
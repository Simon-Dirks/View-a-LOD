import { Component, Input, OnInit } from '@angular/core';
import {
  AsyncPipe,
  JsonPipe,
  KeyValuePipe,
  NgForOf,
  NgIf,
} from '@angular/common';
import { NodeModel } from '../../models/node.model';
import { NodeService } from '../../services/node.service';
import { Settings } from '../../config/settings';
import { SparqlService } from '../../services/sparql.service';
import { DataService } from '../../services/data.service';
import { ThingWithLabelModel } from '../../models/thing-with-label.model';
import { NodeHierarchyComponent } from '../node-hierarchy/node-hierarchy.component';
import { NodeTypesComponent } from './node-types/node-types.component';
import { NodeImagesComponent } from './node-images/node-images.component';
import { CacheService } from '../../services/cache.service';
import { NodeLinkComponent } from './node-link/node-link.component';
import { NodeViewRendererComponent } from '../node-view-renderer/node-view-renderer.component';
import { SparqlNodeParentModel } from '../../models/sparql/sparql-node-parent.model';

@Component({
  selector: 'app-node',
  standalone: true,
  imports: [
    JsonPipe,
    NgIf,
    NgForOf,
    NodeHierarchyComponent,
    NodeTypesComponent,
    NodeImagesComponent,
    AsyncPipe,
    KeyValuePipe,
    NodeLinkComponent,
    NodeViewRendererComponent,
  ],
  templateUrl: './node.component.html',
  styleUrl: './node.component.scss',
})
export class NodeComponent implements OnInit {
  @Input() node?: NodeModel;
  parents: ThingWithLabelModel[] = [];

  protected readonly Settings = Settings;

  constructor(
    public nodes: NodeService,
    public sparql: SparqlService,
    public data: DataService,
    public cache: CacheService,
  ) {}

  ngOnInit() {
    void this.retrieveParents();
  }

  get title(): string | undefined {
    const titles = this.nodes
      .getObjValues(this.node, Settings.predicates.title)
      .map((title) => title.trim());
    if (!titles || titles.length === 0) {
      return undefined;
    }

    return titles[0];
  }

  get types() {
    const typeIds: string[] = this.nodes.getObjValues(
      this.node,
      Settings.predicates.type,
    );

    typeIds.forEach((typeId) => {
      void this.cache.cacheLabelForId(typeId);
    });

    return typeIds;
  }

  async retrieveParents() {
    if (!this.node) {
      return;
    }

    const response: SparqlNodeParentModel[] = await this.sparql.getAllParents(
      this.node,
    );

    this.parents = this.data.getOrderedParentsFromSparqlResults(
      this.nodes.getId(this.node),
      response,
    );
  }
}
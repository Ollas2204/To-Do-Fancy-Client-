<template>
<div class="column">
    <md-table v-model="data" md-card @md-selected="onSelect">
      <md-table-row slot="md-table-row" slot-scope="{ item }" :class="getClass(item)" md-selectable="single">
        <md-table-cell md-label="ID" md-sort-by="id" md-numeric>{{ item.no }}</md-table-cell>
        <md-table-cell md-label="Description" md-sort-by="name">{{ item.content }}</md-table-cell>
        <md-table-cell md-label="Created At" md-sort-by="name">{{ JSON.stringify(item.forDate )}}</md-table-cell>
        <md-table-cell md-label="Checklist" md-sort-by="email">{{ item.checklist? 'Done' : 'Pending' }}</md-table-cell>
        <md-table-cell md-label="Today Weather's" md-sort-by="email">{{ item.weather}}</md-table-cell>
      </md-table-row>
    </md-table>
    <div id="modal2" class="modal">
      <div class="modal-content Light-pink">
        <label>Description : </label>
        <h5>{{ selected.content }}</h5>
        <label>Date</label>
        <h5>{{ JSON.stringify(selected.forDate) }}</h5>
      </div>
      <div class="modal-footer">
        <a class="modal-action modal-close waves-effect waves-Pink btn-flat">Cancel</a>
        <a class="modal-action modal-close waves-effect waves-Pink btn-flat" @click='onDestroy(selected._id)'>Delete</a>
        <a class="modal-action modal-close waves-effect waves-Pink btn-flat" @click='onMove(selected)'>{{ selected.checklist?  'move to pending' : 'move to done' }}</a>
      </div>
    </div>
</div>
</template>

<script>

import {
  mapActions
} from 'vuex'

export default {
  props: ['data', 'token'],
  name: 'TableSingle',
  data: () => ({
    selected: {}
  }),
  created () {
    this.get_data({
      token: this.token
    })
  },
  methods: {
    ...mapActions(['get_token', 'get_data', 'move_status', 'destroy']),
    getClass: ({
      id
    }) => ({
      'md-primary': id === 2,
      'md-accent': id === 3
    }),
    onSelect (item) {
      this.selected = item
      $('#modal2').openModal()
    },
    onMove (selected) {
      let self = this
      this.move_status({
        id: selected._id,
        checklist: !selected.checklist,
        token: this.token
      }).then(() => {
        self.get_data({
          token: self.token
        })
      })
    },
    onDestroy (id) {
      let self = this
      this.destroy({
        id: this.selected._id,
        token: this.token
      }).then(() => {
        self.get_data({
          token: self.token
        })
      })
    }
  }
}
</script>

<style scoped>
.md-table + .md-table {
    margin-top: 16px;
}
</style>

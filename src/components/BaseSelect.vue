<template>
  <div>
    <label v-if="label">{{ label }}</label>
    <select
      :value="value"
      @change="updateValue"
      v-bind="$attrs"
      v-on="listeners"
    >
      <option
        v-for="option in options"
        :selected="option === value"
        :value="option"
        :key="option.id"
        >{{ option }}
      </option>
    </select>
  </div>
</template>

<script>
import { formFieldMixin } from '../mixins/formFieldMixin'
export default {
  mixins: [formFieldMixin],
  inheritAttrs: false,
  props: {
    options: {
      type: Array,
      required: true
    },
    value: [String, Number]
  }
}
</script>

<style lang="scss" scoped></style>

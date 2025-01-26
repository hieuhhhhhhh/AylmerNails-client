<template>
  <form @submit.prevent="onSubmit">
    <table>
      <colgroup>
        <col style="width: auto" />
        <col style="width: 80%" />
      </colgroup>
      <tbody>
        <tr>
          <th>Name:</th>
          <td id="flexBox">
            <input type="text" v-model="name" required />
          </td>
        </tr>

        <tr>
          <th>Category:</th>
          <td id="flexBox">
            <select v-model="categoryId" required>
              <option
                v-for="cate in categories"
                :key="cate.cate_id"
                :value="cate.cate_id"
              >
                {{ cate.name }}
              </option>
              <option :value="'null'">*empty</option>
            </select>
          </td>
        </tr>

        <tr>
          <th>
            Default Length:<br />
            (minutes)
          </th>
          <td id="flexBox">
            <input type="number" v-model="length" required :min="1" />
          </td>
        </tr>
        <tr>
          <th>Description:</th>
          <td id="flexBox">
            <textarea
              id="description"
              type="text"
              rows="3"
              v-model="description"
            />
          </td>
        </tr>
        <tr>
          <th>Members:</th>
          <td>
            <div v-for="employee in employees" :key="employee.employee_id">
              <input
                id="check"
                type="checkbox"
                :value="employee.employee_id"
                v-model="checkedEmp"
              />
              <label>{{ employee.alias }}</label>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <br />
    <div id="addOn">
      <b>Additional Options:</b>
      <AOSsEdit
        :AOSs="AOSs"
        :editAOS="editAOS"
        :removeOption="removeOption"
        :addOption="addOption"
        :addQuestion="addQuestion"
        :removeQuestion="removeQuestion"
        :onInputQuestion="onInputQuestion"
      />
      <button class="greenBtn">
        <FontAwesomeIcon :icon="saveIcon" /> <b>Confirm New Service</b>
      </button>
    </div>
  </form>
</template>

<script>
export default {};
</script>

<style scoped>
input,
textarea {
  width: 100%;
}
th,
td {
  padding: 10px;
  text-align: left;
}
#flexBox {
  display: flex;
}
#addOn {
  padding: 10px;
  border-top: 3px var(--xtrans-gray) solid;
  border-bottom: 3px var(--xtrans-gray) solid;
}

#duo {
  display: flex;
  gap: 15px;
}

#check {
  transform: scale(1.5);
  margin: 5px;
}
</style>
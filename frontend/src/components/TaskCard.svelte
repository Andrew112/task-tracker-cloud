 <script>
  export let task;
  export let onDelete;
</script>

<div class="task-card">
  <h3>{task.title}</h3>
  <p>{task.description}</p>
  <p>Status: {task.status}</p>
  <button on:click={() => onDelete(task.id)}>Delete</button>
</div>

<style>
  .task-card {
    border: 1px solid #ccc;
    padding: 1rem;
    margin: 0.5rem 0;
    border-radius: 0.5rem;
  }
  button {
    background-color: #f00;
    color: white;
    border: none;
    padding: 0.3rem 0.6rem;
    border-radius: 0.3rem;
    cursor: pointer;
  }
</style>

botão editar (1)
 = salvar a tarefa atual no estado global
 = habilitar o botão de editar 2 formulário

botão editar (2) formulário
 = pegar a tarefa no estado global
 = desestruturar o estado do formulário

 = tarefa editada = {...tarefa global, pagamento, tag, }
      tarefa global + alteraçòes feita pelo usuário
 = chama a action pra atualiza global
   1) usa index estadoglobal[index] = tarefa editada
   2) pega o id da tarefa editada, acha ela no estado global e substitui pela tarefa editada

global = { editTask: task, editTaskIndex: index, allTasks: all}
   saveChanges() => {
     const {editTask, editTaskIndex} = this.props;
     const { tag, method, descricao} = this.state
     const finalTask = {...editTask[0], tag, method, descricao}
      const newList = allTasks[editTaskIndex] = editTask
     dispatchEvent(action(newList))
   }

   action {
     type: edit,
     payload: newList
   }
import React, { useState } from "react";
import "./styles.css";

export const App = () => {
  // 入力エリア
  const [todoText, setTodoText] = useState("");
  // 未完了リスト
  const [incompleteTodos, setIncompleteTodos] = useState([]);
  // 完了リスト
  const [completeTodos, setCompleteTodos] = useState([]);
  // inputないのテキストの変更の検知
  const onChangeTodoText = (event) => setTodoText(event.target.value);

  // 追加ボタン押した時のイベント処理
  const onClickAdd = () => {
    // 入力値が空だったら追加処理にしない。（returnを返す。）
    if (todoText === "") return;
    // 追加したTodoも含めた新しい配列の作成
    const newTodos = [...incompleteTodos, todoText];
    // 未完了のTODOに追加したTodoも含めて表示
    setIncompleteTodos(newTodos);
    // inputエリアの入力値をクリアにする。
    setTodoText("");
  };

  // 削除ボタン押した時のイベント処理
  const onClickDelete = (index) => {
    const newTodos = [...incompleteTodos];
    // 削除ボタンを押したTODOを削除
    newTodos.splice(index, 1);
    // 新しい配列
    setIncompleteTodos(newTodos);
  };

  // 完了ボタン押した時のイベント処理
  const onClickComplete = (index) => {
    const newIncompleteTodos = [...incompleteTodos];
    // 勘定ボタンを押したTODOを未完了エリアからクリア
    newIncompleteTodos.splice(index, 1);
    // 完了のTODOに未完了TODOから「完了」ボタンを押されたTODOも並べる。
    const newCompleteTodos = [...completeTodos, incompleteTodos[index]];
    // 新しい配列
    // 未完了リスト
    setIncompleteTodos(newIncompleteTodos);
    // 完了リスト
    setCompleteTodos(newCompleteTodos);
  };

  // 戻るボタンを押した時の処理
  const onclickBack = (index) => {
    const newCompleteTodos = [...completeTodos];
    // 完了リストからの削除処理
    newCompleteTodos.splice(index, 1);
    // 未完了リストへの追加処理
    const newIncompleteTodos = [...incompleteTodos, completeTodos[index]];
    // 新しい配列
    // 未完了リスト
    setIncompleteTodos(newIncompleteTodos);
    // 完了リスト
    setCompleteTodos(newCompleteTodos);
  };

  return (
    <>
      <div className="input-area">
        <input
          placeholder="TODOを入力"
          value={todoText}
          onChange={onChangeTodoText}
        />
        <button onClick={onClickAdd}>追加</button>
      </div>
      <div className="incomplete-area">
        <p className="title">未完了のTODO</p>
        <ul>
          {/* 1つ目の引数：実際の値、 2つ目の引数：順番*/}
          {incompleteTodos.map((todo, index) => {
            return (
              <li key={todo}>
                <div className="list-row">
                  <p>{todo}</p>
                  <button onClick={() => onClickComplete(index)}>完了</button>
                  {/* 削除ボタン押された時に押されたTODOの順番を取得 */}
                  <button onClick={() => onClickDelete(index)}>削除</button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="complete-area">
        <p className="title">完了のTODO</p>
        <ul>
          {completeTodos.map((todo, index) => {
            return (
              <li key={todo}>
                <div className="list-row">
                  <p>{todo}</p>
                  <button onClick={() => onclickBack(index)}>戻す</button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

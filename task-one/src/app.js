import FileTree from "./fileTree";

export function createFileTree(input) {
  const fileTree = new FileTree();
  let arr1 = []; //parentArray
  let arr2 = []; //childrensArray
  for (let i = 0; i < input.length; i++) {
    if (input[i].parentId) {
      arr2.push(input[i]);
    } else {
      arr1.push(input[i]);
    }
  }
  // console.log(arr2)
  for (let i = 0; i < arr1.length; i++) {
    for (let index = 0; index < arr2.length; index++) {
      if (arr1[i].id === arr2[index].parentId) {
        arr1.push(arr2[index]);
      }
    }
  }
  input = arr1;

  for (const inputNode of input) {
    const parentNode = inputNode.parentId
      ? fileTree.findNodeById(inputNode.parentId)
      : null;

    fileTree.createNode(
      inputNode.id,
      inputNode.name,
      inputNode.type,
      parentNode
    );
  }
  return fileTree;
}

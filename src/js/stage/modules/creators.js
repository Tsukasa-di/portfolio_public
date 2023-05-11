import { CULC } from "../../_libs/culc/app";
import { OP } from "../../_libs/operator/node";
import { DOM } from "../../global/dom";
import { INST } from "../../global/objects";

/**
 * ひとつ分のオブジェクトを生成します
 * @param {number} オブジェクトの番号
 * @return {HTMLElement} 生成したElementを返します
 */
function create(num) {
  const _vals = {
    width: Math.floor( (Math.random() * 30) + 1 ),
    backgroundColor: CULC.getRGBColor(INST.stageOperator.color, 206, 20),
    marginLeft: 30
  }
  const styles = {
    width: _vals.width + 'px',
    left: INST.stageOperator.props.left + 'px',
    backgroundColor: _vals.backgroundColor
  }
  const object = document.createElement('div');
  object.classList.add('child', 'child-' + (num+1));
  Object.keys(styles).forEach( key => {
    object.style[key] = styles[key];
  });
  ( 
   ( (num+1)%10 ) == 0)
    ? (INST.stageOperator.props.left += _vals.width + _vals.marginLeft)
    : (INST.stageOperator.props.left += _vals.width
  );
  return object;
}

/**
 * #STAGEに出力する全てのオブジェクトを生成します
 */
function createObjects() {
  let count = 0;
  while (count < INST.stageOperator.vals.objectTotal) DOM.BG.AREA.append(create(count++));
  INST.stageOperator.objects = OP.node.qsAll('.child', DOM.BG.AREA);
}

export { createObjects };

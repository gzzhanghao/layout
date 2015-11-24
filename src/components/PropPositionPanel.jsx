export default function PropPositionComponent(props) {
  return (
    <fieldset className="prop prop-position">
      <legend>Position</legend>
      <div className="field">
        <label htmlFor="prop-pos-x">X</label>
        <input type="text" id="prop-pos-x"/>
      </div>
      <div className="field">
        <label htmlFor="prop-pos-y">Y</label>
        <input type="text" id="prop-pos-y"/>
      </div>
      <div className="field">
        <label htmlFor="prop-pos-width">Width</label>
        <input type="text" id="prop-pos-width"/>
      </div>
      <div className="field">
        <label htmlFor="prop-pos-height">Height</label>
        <input type="text" id="prop-pos-height"/>
      </div>
    </fieldset>
  )
}

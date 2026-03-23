// Any resistor (THT, SMD, or both)
// Nets
//    from: corresponds to pin 1
//    to: corresponds to pin 2
// Params
//    tht: default is true
//      if true, will include through-hole pads
//    smd: default is true
//      if true, will include SMD pads on both sides for reversible builds
//    pin_distance: default is 7.62
//      distance between THT pads in mm
//    smd_pin_distance: default is 3.3
//      distance between SMD pads in mm (fits 0805/0603 packages)
//
// Common use cases:
//    I2C pull-ups:         typically 4.7k between SDA/SCL and VCC
//    LED current limiting: typically 100-470 ohm between MCU pin and LED
//    General purpose:      any 2-pin resistive component
//
// note: tht and smd can be used simultaneously (default), or individually

module.exports = {
  params: {
    designator: 'R',
    pin_distance: 7.62,
    smd_pin_distance: 3.3,
    tht: true,
    smd: true,
    from: undefined,
    to: undefined,
  },
  body: (p) => {
    const half = p.pin_distance / 2;
    const smd_half = p.smd_pin_distance / 2;

    const standard = `
				(module ComboResistor (layer F.Cu) (tedit 5B24D78E)
				${p.at /* parametric position */}
				${'' /* footprint reference */}
				(fp_text reference "${p.ref}" (at 0 0) (layer F.SilkS) ${p.ref_hide} (effects (font (size 1.27 1.27) (thickness 0.15))))
				(fp_text value "" (at 0 0) (layer F.SilkS) hide (effects (font (size 1.27 1.27) (thickness 0.15))))
				${'' /* resistor symbols */}
				(fp_line (start -0.75 0) (end -0.5 0) (layer F.SilkS) (width 0.1))
				(fp_line (start -0.5 -0.35) (end -0.5 0.35) (layer F.SilkS) (width 0.1))
				(fp_line (start -0.5 -0.35) (end 0.5 -0.35) (layer F.SilkS) (width 0.1))
				(fp_line (start 0.5 -0.35) (end 0.5 0.35) (layer F.SilkS) (width 0.1))
				(fp_line (start 0.5 0.35) (end -0.5 0.35) (layer F.SilkS) (width 0.1))
				(fp_line (start 0.5 0) (end 0.75 0) (layer F.SilkS) (width 0.1))
				(fp_line (start -0.75 0) (end -0.5 0) (layer B.SilkS) (width 0.1))
				(fp_line (start -0.5 -0.35) (end -0.5 0.35) (layer B.SilkS) (width 0.1))
				(fp_line (start -0.5 -0.35) (end 0.5 -0.35) (layer B.SilkS) (width 0.1))
				(fp_line (start 0.5 -0.35) (end 0.5 0.35) (layer B.SilkS) (width 0.1))
				(fp_line (start 0.5 0.35) (end -0.5 0.35) (layer B.SilkS) (width 0.1))
				(fp_line (start 0.5 0) (end 0.75 0) (layer B.SilkS) (width 0.1))
      `
    const tht_pads = `
				${'' /* THT terminals */}
				(pad 1 thru_hole rect (at -${half} 0 ${p.r}) (size 1.778 1.778) (drill 0.9906) (layers *.Cu *.Mask) ${p.from})
				(pad 2 thru_hole circle (at ${half} 0 ${p.r}) (size 1.905 1.905) (drill 0.9906) (layers *.Cu *.Mask) ${p.to})
      `
    const smd_pads = `
				${'' /* SMD pads on both sides */}
				(pad 1 smd rect (at -${smd_half} 0 ${p.r}) (size 0.9 1.2) (layers F.Cu F.Paste F.Mask) ${p.from})
				(pad 2 smd rect (at ${smd_half} 0 ${p.r}) (size 0.9 1.2) (layers B.Cu B.Paste B.Mask) ${p.to})
				(pad 1 smd rect (at -${smd_half} 0 ${p.r}) (size 0.9 1.2) (layers B.Cu B.Paste B.Mask) ${p.from})
				(pad 2 smd rect (at ${smd_half} 0 ${p.r}) (size 0.9 1.2) (layers F.Cu F.Paste F.Mask) ${p.to})
      `
    return `
			${standard}
			${p.tht ? tht_pads : ''}
			${p.smd ? smd_pads : ''}
			)
    `;
  },
};
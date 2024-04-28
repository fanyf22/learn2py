import { Image as AntdImage } from 'antd'

/**
 * @param {string} name
 * @param {number | string} width
 * @constructor
 */
export default function Image({ name, width = '100%' }) {
  const path = '/images/' + name.toLowerCase().replaceAll(' ', '-') + '.png'

  return (
    <center>
      <br />
      <AntdImage src={path} alt={name} width={width} />
    </center>
  )
}

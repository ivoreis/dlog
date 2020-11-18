const shortcuts: ShortcutProps[] = [
  {
    name: 'Display this help',
    keycode: 'h',
  },
  {
    name: 'Presenter mode',
    keycode: 'p',
  },
  {
    name: 'Next slide',
    keycode: '&#8594;',
  },
  {
    name: 'Previous slide',
    keycode: '&#8592;',
  },
  {
    name: 'Color mode',
    keycode: 'm',
  },
  {
    name: 'Nav links',
    keycode: 'n',
  },
]

export interface ShortcutProps {
  name: string
  keycode: string
}

export type Colors = 'RED' | 'BLUE'
export type ColorMap = { [color in Colors]: color }
export const colors: ColorMap = {
  RED: 'RED',
  BLUE: 'BLUE',
}

const Shortcut = (props: ShortcutProps) => {
  const { name, keycode } = props
  return (
    <dl className="flex pb-3">
      <dt className="flex-1">{name}</dt>
      <dd className="rounded-full px-5 bg-default">
        <kbd
          className="text-sm leading-5"
          dangerouslySetInnerHTML={{ __html: keycode }}
        />
      </dd>
    </dl>
  )
}

const HelpModal = () => {
  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity">
          <div className="absolute inset-0 bg-gray-500 opacity-75" />
        </div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" />
        &#8203;
        <div
          className="inline-block align-bottom bg-default rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div>
            <div className="mt-3 text-center sm:mt-5">
              <h4
                className="text-lg leading-6 font-medium text-default"
                id="modal-headline"
              >
                Keyboard shortcuts
              </h4>
              <div className="mt-4 text-left pt-2 text-default">
                {shortcuts.map((shortcut) => (
                  <Shortcut
                    key={shortcut.name}
                    keycode={shortcut.keycode}
                    name={shortcut.name}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HelpModal

import { useState, useCallback } from 'react'
import { SignUpNext, Seed } from '../lib'
import { useSignUp } from '../lib'
import { generateAddresses, generateWallet } from '../utils'
import { importKey, loadKeys } from '../utils/localStorage'
import Form from '../components/Form'
import ErrorComponent from '../components/ErrorComponent'
import Warning from './Warning'
import Mnemonics from './Mnemonics'
import SelectAccount from './SelectAccount'
import ConfirmSeed from './ConfirmSeed'

const Recover = ({ generated }: { generated?: Seed }) => {
  const { form, mnemonics, warning, next, reset, error } = useSignUp({
    generated,
    generateAddresses,
    generateWallet,
    submit: importKey,
    isNameExists: (name: string) => isExists('name', name),
  })

  /* warning */
  const [checked, setChecked] = useState(false)
  const toggle = () => setChecked((c) => !c)

  /* next */
  const renderNext = (next: SignUpNext) => {
    const components = {
      select: () => <SelectAccount {...next} />,
      confirm: () => <ConfirmSeed {...next} />,
    }

    return components[next.step]()
  }

  return error ? (
    <ErrorComponent error={error}>{error.message}</ErrorComponent>
  ) : next ? (
    renderNext(next)
  ) : (
    <Form
      form={form}
      disabled={generated && !checked}
      renderAfterFields={() =>
        generated ? (
          <Warning {...warning} attrs={{ checked, onChange: toggle }} />
        ) : (
          <Mnemonics {...mnemonics} />
        )
      }
    />
  )
}

export default Recover

/* helper */
const isExists = (q: keyof Key, v: string): boolean => {
  const keys = loadKeys()
  return !!keys.find((key) => key[q] === v)
}

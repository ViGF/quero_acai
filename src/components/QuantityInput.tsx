import * as Select from "@radix-ui/react-select";
import { ChevronDownIcon } from "lucide-react";

interface QuantityInput {
  defaultValue: number;
  orderId: string;
  userId: string
  removeItemFromLocalData: (orderId: string) => void
  updateQuantityOnLocalData: (orderId: string, quantity: number) => void
}

const SelectItem = ({value}: {value: string}) => {
  return (
    <Select.Item
      aria-label={value}
      value={value}
      className="px-3 py-2 hover:bg-thirtiary hover:cursor-pointer"
    >
      <Select.ItemText>{value}</Select.ItemText>
    </Select.Item>
  )
}

export function QuantityInput({ defaultValue, orderId, userId, removeItemFromLocalData, updateQuantityOnLocalData }: QuantityInput) {
  const saveQuantity = async (value: number) => {
    if (value == 0) {
      //remove item
      const confirmation = window.confirm('Deseja remover o item?')

      if (confirmation) {
        const orderRemoved: OrderProps = await fetch(`/api/user/${userId}/cart`, {
          method: 'PUT',
          body: JSON.stringify({
            orderId
          })
        }).then(async res => res.json())
  
        if (orderRemoved) {
          return removeItemFromLocalData(orderRemoved.id)
        }
  
        return null
      }

      return null
    } else if (value == defaultValue) {
      return null;
    } else {
      //update quantity
      const orderEdited: OrderProps = await fetch(`/api/user/${userId}/cart`, {
        method: 'PATCH',
        body: JSON.stringify({
          orderId,
          quantity: value
        })
      }).then(async res => res.json())

      if (orderEdited) {
        return updateQuantityOnLocalData(orderId, value)
      }

      return null
    }
  }

  return (
    <Select.Root onValueChange={value => saveQuantity(+value)}>
      <Select.Trigger className="my-1 flex items-center justify-center gap-1 px-1">
        <Select.Value
          placeholder={defaultValue}
          defaultValue={defaultValue}
          aria-label="Quantidade"
        />
        <Select.Icon>
          <ChevronDownIcon size={16} />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content className="rounded overflow-hidden bg-secondary text-sm">
          <Select.Item
            value="0"
            className="bg-thirtiary py-1 font-medium px-4 text-center cursor-pointer"
          >
            <Select.ItemText>Remover</Select.ItemText>
          </Select.Item>
          <Select.Viewport>
            <SelectItem value="1" />
            <SelectItem value="2" />
            <SelectItem value="3" />
            <SelectItem value="4" />
            <SelectItem value="5" />
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}

import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function FormHeader({ form, setForm, mode, setMode }) {
  return (
    <div className='p-4 bg-white shadow-sm'>
      <Input
        className='text-xl md:text-2xl font-semibold h-12'
        value={form?.title || ''}
        onChange={(e) => setForm?.({ ...form, title: e.target.value })}
        placeholder='Untitled form'
      />
      <Textarea
        className='mt-2'
        value={form?.description || ''}
        onChange={(e) => setForm?.({ ...form, description: e.target.value })}
        placeholder='Form description'
      />

      {/* Tabs */}
      <Tabs value={mode} onValueChange={(v) => setMode?.(v)} className='mt-4'>
        <TabsList>
          <TabsTrigger value='builder'>Build</TabsTrigger>
          <TabsTrigger value='fill'>Fill</TabsTrigger>
          <TabsTrigger value='results'>Results</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  )
}

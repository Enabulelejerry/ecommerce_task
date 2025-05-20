
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';


import { deleteSliderAction, fetchAdminSlider } from '@/utils/actions';
import { formatDate } from '@/utils/format';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import EmptyList from '@/components/global/EmptyList';
import FormContainer from '@/components/form/FormContainer';
import { IconButton } from '@/components/form/Buttons';

async function SliderPage() {
      const sliders = await fetchAdminSlider();
  if(sliders.length === 0) return <EmptyList />
  return (
            
	      <div>
			<div className='flex justify-end mb-4'>
				<Link href='/admin/sliders/create'>
                   <Button className='capitalize font-normal'>
					 create slider
				   </Button>
				</Link>
			</div>
			<Table>
          <TableHeader>
             <TableRow>
				<TableHead>Title</TableHead>
				<TableHead>image</TableHead>
				<TableHead>Date</TableHead>
				<TableHead>Action</TableHead>
           </TableRow>
          </TableHeader>
          <TableBody>
			 {sliders.map((slider)=>{

				return <TableRow key={slider.id}>
                <TableCell>{slider.title}</TableCell>
                <TableCell>
					<div className="relative w-20 h-20 flex-shrink-0 rounded overflow-hidden">
						<Image
						   src={slider.imageUrl}
							alt='slider name'
							fill
							sizes="(max-width: 768px) 100vw, 200px"
							className="object-cover"
							/>
							</div>
					</TableCell>
                    <TableCell>{formatDate(slider.createdAt)}</TableCell>
                 <TableCell>
					 <DeleteSlider sliderId={slider.id} />
				</TableCell>       
            </TableRow>
			 })}
           
         
          </TableBody>
      </Table>

		  </div>
	   
  )
}

function DeleteSlider({sliderId}:{sliderId:string}){
  const deleteSlider = deleteSliderAction.bind(null,{sliderId})
  return <FormContainer action={deleteSlider}>
         <IconButton actionType='delete' />
      </FormContainer>
}

export default SliderPage
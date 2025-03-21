import { InFileWorkerParams } from '@/interface/base/InFileWorkerParams'
import { AnyFileHelper } from '../AnyFileHelper'

onmessage = (e) => {
  const { file, chunkSize, startChunkIndex, endChunkIndex } = e.data as InFileWorkerParams
  const task = []
  for (let i = startChunkIndex; i <= endChunkIndex; i++) {
    task.push(AnyFileHelper.createChunk(file, i, chunkSize))
  }
  const chunks = Promise.all(task)
  postMessage(chunks)
}
